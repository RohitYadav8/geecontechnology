import { Navbar } from "../../components/navbar";
import { HeroSlider } from "../../components/home/hero-slider";
import { FactsSection } from "../../components/home/facts-section";
import { ServicesGrid } from "../../components/home/services-grid";
import { Testimonials } from "../../components/home/testimonials";
import { ClientLogos } from "../../components/home/client-logos";
import { Footer } from "../../components/footer";
import { ProductSolutions } from "../../components/home/product-solutions";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
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