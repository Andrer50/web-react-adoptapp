import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRelativeImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    if (urlObj.pathname.startsWith('/media/')) {
      return urlObj.pathname;
    }
  } catch (e) {
    // If it's already a relative path or invalid url
  }
  return url;
}

