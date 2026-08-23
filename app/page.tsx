import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { ProductReveal } from "@/components/ProductReveal";
import { MenuHighlights } from "@/components/MenuHighlights";
import { Gallery } from "@/components/Gallery";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <ProductReveal />
        <MenuHighlights />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
