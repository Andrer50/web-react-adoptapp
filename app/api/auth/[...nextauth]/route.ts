import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

interface TokenResponse {
  access: string;
  refresh: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  tipo_rol?: string;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await axios.post<TokenResponse>(`${BACKEND_URL}/api/token/refresh/`, {
      refresh: token.refreshToken,
    });

    return {
      ...token,
      accessToken: data.access,
      accessTokenExpires: Date.now() + 60 * 60 * 1000,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return { ...token, error: 'AccessTokenExpired' };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const { data } = await axios.post<TokenResponse>(`${BACKEND_URL}/api/token/`, {
            username: credentials?.username,
            password: credentials?.password,
          });

          if (!data.access || !data.refresh) {
            return null;
          }

          const fullName = data.first_name && data.last_name 
            ? `${data.first_name} ${data.last_name}` 
            : (credentials?.username ?? '');

          return {
            id: credentials?.username ?? 'user',
            email: data.email ?? credentials?.username ?? '',
            name: fullName,
            profilePicture: '',
            phone: '',
            role: data.tipo_rol ?? 'USER',
            permissions: [],
            status: 'ACTIVE',
            accessToken: data.access,
            refreshToken: data.refresh,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const msg = error.response?.data?.message || 'Credenciales inválidas';
            throw new Error(msg);
          }
          throw new Error('Error inesperado en la autenticación');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.phone = user.phone;
        token.role = user.role;
        token.permissions = user.permissions;
        token.status = user.status;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        phone: token.phone,
        role: token.role,
        permissions: token.permissions,
        status: token.status,
      };
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
