import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { SignatureDishes } from "@/components/SignatureDishes";
import { MenuHighlights } from "@/components/MenuHighlights";
import { Gallery } from "@/components/Gallery";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { assetExists, getPngDimensions } from "@/lib/imageMeta";

export default function Home() {
  const hasStorefront = assetExists("images/The-han-storefront.png");
  const hasHero2 = assetExists("images/The-han-hero2.png");
  const logoDimensions = getPngDimensions("images/TheHanLogo.png");
  const hasLogo = logoDimensions !== null;

  return (
    <>
      <Nav hasLogo={hasLogo} logoDimensions={logoDimensions} />
      <main>
        <Hero hasHero2={hasHero2} />
        <Philosophy />
        <SignatureDishes />
        <MenuHighlights />
        <Gallery hasStorefront={hasStorefront} />
        <Visit />
      </main>
      <Footer hasLogo={hasLogo} logoDimensions={logoDimensions} />
    </>
  );
}
