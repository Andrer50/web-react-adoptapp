import { Header } from "@/presentation/site/Header";
import { Hero } from "@/presentation/site/Hero";
import { HowItWorks } from "@/presentation/site/HowItWorks";
import { FeaturedPets } from "@/presentation/site/FeaturedPets";
import { Footer } from "@/presentation/site/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <FeaturedPets />
      </main>
      <Footer />
    </div>
  );
}
