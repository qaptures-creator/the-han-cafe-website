import { Reveal } from "@/components/Reveal";
import {
  formatPrice,
  type AddOn,
  type MenuGroup,
  type MenuItem,
  type MenuSection,
} from "@/lib/menu";

function PriceLine({
  name,
  price,
  priceNote,
  as: Tag = "h4",
  size = "lg",
}: {
  name: string;
  price?: number;
  priceNote?: string;
  as?: "h3" | "h4" | "p";
  size?: "lg" | "sm";
}) {
  return (
    <div className="flex items-baseline gap-3">
      <Tag
        className={
          size === "lg"
            ? "min-w-0 font-display text-xl font-light text-ink md:text-[1.35rem]"
            : "min-w-0 text-[0.95rem] text-ink/85"
        }
      >
        {name}
      </Tag>
      {price !== undefined && (
        <>
          <span
            aria-hidden
            className="min-w-[1.25rem] flex-1 -translate-y-[0.3em] border-b border-dotted border-ink/25"
          />
          <span
            className={`shrink-0 whitespace-nowrap tabular-nums ${
              size === "lg" ? "font-display text-lg text-bronze" : "text-[0.95rem] text-bronze"
            }`}
          >
            {formatPrice(price)}
            {priceNote && (
              <span className="ml-1.5 text-[0.7rem] uppercase tracking-[0.15em] text-ink/50">
                {priceNote}
              </span>
            )}
          </span>
        </>
      )}
    </div>
  );
}

function AddOns({ label, addOns }: { label?: string; addOns: AddOn[] }) {
  return (
    <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-ink/10 pt-5 text-sm text-ink/70">
      {label && (
        <span className="text-xs uppercase tracking-[0.2em] text-ink/50">{label}</span>
      )}
      {addOns.map((a) => (
        <span key={a.name} className="whitespace-nowrap">
          {a.name} <span className="text-bronze">+{formatPrice(a.price)}</span>
        </span>
      ))}
    </div>
  );
}

function Item({ item, level }: { item: MenuItem; level: "h3" | "h4" }) {
  return (
    <li className="py-5 first:pt-0">
      <PriceLine name={item.name} price={item.price} priceNote={item.priceNote} as={level} />
      {item.note && (
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bronze">{item.note}</p>
      )}
      {item.description && (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60">
          {item.description}
        </p>
      )}
      {item.choices && (
        <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-1.5 text-sm text-ink/60 sm:grid-cols-2">
          {item.choices.map((choice) => (
            <li key={choice} className="flex items-baseline gap-3">
              <span aria-hidden className="h-px w-3 shrink-0 -translate-y-[0.3em] bg-brass" />
              {choice}
            </li>
          ))}
        </ul>
      )}
      {item.addOns && (
        <p className="mt-2 text-sm text-ink/60">
          {item.addOns.map((a) => (
            <span key={a.name} className="mr-4 whitespace-nowrap">
              + {a.name} <span className="text-bronze">{formatPrice(a.price)}</span>
            </span>
          ))}
        </p>
      )}
    </li>
  );
}

function Group({ group }: { group: MenuGroup }) {
  return (
    <div>
      {group.title && (
        <h3 className="mb-5 text-xs uppercase tracking-[0.28em] text-ink/55">
          {group.title}
        </h3>
      )}
      {group.compact ? (
        <ul className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {group.items.map((item) => (
            <li key={item.name}>
              <PriceLine name={item.name} price={item.price} as="p" size="sm" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="divide-y divide-ink/10">
          {group.items.map((item) => (
            <Item key={item.name} item={item} level={group.title ? "h4" : "h3"} />
          ))}
        </ul>
      )}
      {group.addOns && <AddOns label={group.addOnsLabel} addOns={group.addOns} />}
    </div>
  );
}

export function MenuSectionBlock({
  section,
  index,
}: {
  section: MenuSection;
  index: number;
}) {
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      // Alternating cream / warm sand bands give each category its own chapter.
      className={`scroll-mt-32 px-6 py-16 md:scroll-mt-40 md:px-10 md:py-24 ${
        index % 2 === 1 ? "bg-sand/40" : "bg-cream"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <Reveal y={16} className="md:sticky md:top-44 md:self-start">
          <p className="mb-4 font-display text-sm italic text-bronze">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h2
            id={headingId}
            className="font-display text-4xl font-light italic leading-[1.1] text-ink md:text-5xl"
          >
            {section.title}
          </h2>
          {section.intro && (
            <p className="mt-5 max-w-xs text-base leading-relaxed text-ink/65">
              {section.intro}
            </p>
          )}
          {section.notes?.map((note) => (
            <p
              key={note}
              className="mt-4 flex max-w-xs items-start gap-3 text-xs uppercase leading-relaxed tracking-[0.2em] text-bronze"
            >
              <span aria-hidden className="mt-[0.55em] h-px w-6 shrink-0 bg-brass" />
              {note}
            </p>
          ))}
        </Reveal>

        <div className="min-w-0 space-y-14">
          {section.groups.map((group, i) => (
            <Group key={group.title ?? i} group={group} />
          ))}
          {section.addOns && (
            <AddOns label={section.addOnsLabel} addOns={section.addOns} />
          )}
        </div>
      </div>
    </section>
  );
}
