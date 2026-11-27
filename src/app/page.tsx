import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { SitePage } from "../../components/site/ui";
import { HomeHero } from "../../components/home/home-hero";
import {
  HomeAbout,
  HomeClients,
  HomeServices,
} from "../../components/home/home-sections";
import { HomeSolutions } from "../../components/home/home-solutions";
import { Testimonials } from "../../components/home/testimonials";

export default function Home() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <HomeHero />
        <HomeAbout />
        <HomeServices />
        <HomeSolutions />
        <Testimonials />
        <HomeClients />
      </main>

      <Footer />
    </SitePage>
  );
}
