import { Navbar } from "../../components/navbar";
import { HeroSlider } from "../../components/home/hero-slider";
import { FactsSection } from "../../components/home/facts-section";
import { ServicesGrid } from "../../components/home/services-grid";
import { ProductSolutions } from "../../components/home/product-solutions";
import { Testimonials } from "../../components/home/testimonials";
import { ClientLogos } from "../../components/home/client-logos";
import { Footer } from "../../components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white transition-colors duration-500 dark:bg-[#060b16]">
      <Navbar />

      <main className="flex-1">
        <HeroSlider />
        <FactsSection />
        <ServicesGrid />
        <ProductSolutions />
        <Testimonials />
        <ClientLogos />
      </main>

      <Footer />
    </div>
  );
}