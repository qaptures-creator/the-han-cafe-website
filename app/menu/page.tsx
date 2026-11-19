import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MenuHeader } from "@/components/menu/MenuHeader";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { MenuSectionBlock } from "@/components/menu/MenuSectionBlock";
import { MenuClosing } from "@/components/menu/MenuClosing";
import { getPngDimensions } from "@/lib/imageMeta";
import { business } from "@/lib/content";
import { menu } from "@/lib/menu";

export const metadata: Metadata = {
  title: `Menu — ${business.name}`,
  description: `The full menu at ${business.name}, a Halal Mediterranean brunch & eatery at ${business.address.line1}, ${business.address.line2}: Turkish serpme breakfast, brunch, lunch, burgers, salads, desserts, coffee, matcha and smoothies.`,
};

function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${business.name} Menu`,
    inLanguage: "en-GB",
    hasMenuSection: menu.map((section) => ({
      "@type": "MenuSection",
      name: section.title,
      ...(section.intro ? { description: section.intro } : {}),
      hasMenuItem: section.groups.flatMap((group) =>
        group.items.map((item) => ({
          "@type": "MenuItem",
          name: group.title ? `${item.name} (${group.title})` : item.name,
          ...(item.description ? { description: item.description } : {}),
          ...(item.price !== undefined
            ? {
                offers: {
                  "@type": "Offer",
                  price: item.price.toFixed(2),
                  priceCurrency: "GBP",
                },
              }
            : {}),
        }))
      ),
    })),
  };
}

export default function MenuPage() {
  const logoDimensions = getPngDimensions("images/The-han-logo.png");
  const hasLogo = logoDimensions !== null;

  return (
    <>
      <Nav hasLogo={hasLogo} logoDimensions={logoDimensions} />
      <main>
        <MenuHeader />
        {/* The category bar is sticky only within the menu sections, so it
            releases before the closing band and footer. */}
        <div className="bg-cream">
          <CategoryNav
            categories={menu.map((s) => ({ id: s.id, label: s.navLabel }))}
          />
          <div className="px-6 md:px-10">
            <div className="mx-auto max-w-6xl">
              {menu.map((section, i) => (
                <MenuSectionBlock key={section.id} section={section} index={i} />
              ))}
            </div>
          </div>
        </div>
        <MenuClosing />
      </main>
      <Footer hasLogo={hasLogo} logoDimensions={logoDimensions} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd()) }}
      />
    </>
  );
}
