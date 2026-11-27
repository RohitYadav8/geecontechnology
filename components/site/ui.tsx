import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/* =========================================================
   PUBLIC SITE PRIMITIVES
   Editorial layout: 12-column grid, a label rail on the left,
   content on the right, hairline rules between blocks.

   Rules for using these:
   - Never repeat the page title as an eyebrow or badge.
   - Show each image once.
   - Do not add a "contact us" band: the footer already has one.
========================================================= */

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ---------------------------------------------------------
   Page shell: wrap every public page's <main> in this
--------------------------------------------------------- */

export function SitePage({ children }: { children: ReactNode }) {
  return (
    <div className="site flex min-h-screen flex-col">{children}</div>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------
   Page header: path trail, big title, intro on the right
--------------------------------------------------------- */

export function PageHeader({
  trail,
  title,
  intro,
  meta,
}: {
  /** Parent sections only, e.g. ["Solutions"]. Never the page title. */
  trail?: Array<{ label: string; href?: string }>;
  title: ReactNode;
  intro?: ReactNode;
  /** Optional small facts shown under the intro (e.g. dates, tags) */
  meta?: ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20">
        {trail && trail.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:mb-14"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            {trail.map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {item.href ? (
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h1 className="font-display text-[42px] font-semibold leading-[0.98] text-ink sm:text-6xl lg:col-span-8 lg:text-[84px]">
            {title}
          </h1>

          {(intro || meta) && (
            <div className="lg:col-span-4 lg:self-end">
              {intro && (
                <div className="text-base leading-7 text-ink-2 sm:text-[17px]">
                  {intro}
                </div>
              )}
              {meta && <div className="mt-6">{meta}</div>}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}

/* ---------------------------------------------------------
   Section: numbered label rail + content
--------------------------------------------------------- */

export function Section({
  index,
  label,
  title,
  children,
  className,
  tone = "paper",
}: {
  /** e.g. "01" */
  index?: string;
  /** Short rail label, e.g. "Approach" */
  label?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "paper" | "tint" | "ink";
}) {
  const toneClass =
    tone === "ink"
      ? "bg-ink text-paper"
      : tone === "tint"
        ? "bg-paper-2"
        : "";

  return (
    <section className={cx("border-b border-line", toneClass, className)}>
      <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-3">
          {(index || label) && (
            <p
              className={cx(
                "font-mono text-[11px] uppercase tracking-[0.18em] lg:sticky lg:top-28",
                tone === "ink" ? "text-paper/60" : "text-muted"
              )}
            >
              {index && <span className="text-accent">{index}</span>}
              {index && label && <span className="mx-2">—</span>}
              {label}
            </p>
          )}
        </div>

        <div className="min-w-0 lg:col-span-9">
          {title && (
            <h2 className="mb-10 max-w-3xl font-display text-3xl font-semibold leading-[1.05] sm:text-[44px]">
              {title}
            </h2>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------
   Text
--------------------------------------------------------- */

export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "site-prose max-w-[68ch] text-[16px] leading-[1.75] text-ink-2 sm:text-[17px]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-3xl font-display text-2xl font-medium leading-[1.3] text-ink sm:text-[30px]">
      {children}
    </p>
  );
}

/* ---------------------------------------------------------
   Numbered rows (replaces bullet cards)
--------------------------------------------------------- */

export function NumberedList({
  items,
  start = 1,
}: {
  items: Array<ReactNode | { title: ReactNode; body?: ReactNode }>;
  start?: number;
}) {
  return (
    <ol className="border-t border-line">
      {items.map((item, i) => {
        const isObj =
          typeof item === "object" &&
          item !== null &&
          "title" in (item as Record<string, unknown>);
        const obj = item as { title: ReactNode; body?: ReactNode };

        return (
          <li
            key={i}
            className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[4.5rem_1fr] sm:py-6"
          >
            <span className="pt-0.5 font-mono text-xs text-accent">
              {String(i + start).padStart(2, "0")}
            </span>
            {isObj ? (
              <div>
                <p className="font-display text-xl font-semibold leading-snug text-ink">
                  {obj.title}
                </p>
                {obj.body && (
                  <div className="mt-2 max-w-[62ch] leading-7 text-ink-2">
                    {obj.body}
                  </div>
                )}
              </div>
            ) : (
              <p className="max-w-[62ch] text-[16px] leading-7 text-ink">
                {item as ReactNode}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------------------------------------------------
   Index rows: big linked rows (replaces card grids)
--------------------------------------------------------- */

export function IndexList({
  items,
}: {
  items: Array<{
    href: string;
    title: ReactNode;
    body?: ReactNode;
    tag?: ReactNode;
  }>;
}) {
  return (
    <ul className="border-t border-line">
      {items.map((item, i) => (
        <li key={item.href + i} className="border-b border-line">
          <Link
            href={item.href}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-6 transition-colors hover:bg-paper-2 sm:grid-cols-[4rem_1fr_12rem_auto] sm:px-3 sm:py-7"
          >
            <span className="pt-1.5 font-mono text-xs text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-accent sm:text-[28px]">
                {item.title}
              </span>
              {item.body && (
                <span className="mt-2 block max-w-[60ch] text-[15px] leading-7 text-ink-2">
                  {item.body}
                </span>
              )}
            </span>
            <span className="hidden pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:block">
              {item.tag}
            </span>
            <ArrowUpRight
              size={22}
              className="mt-1 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------
   Two-up / three-up text columns separated by rules
--------------------------------------------------------- */

export function Columns({
  items,
  cols = 3,
}: {
  items: Array<{ title: ReactNode; body: ReactNode; kicker?: ReactNode }>;
  cols?: 2 | 3 | 4;
}) {
  const colClass =
    cols === 2
      ? "md:grid-cols-2"
      : cols === 4
        ? "md:grid-cols-2 xl:grid-cols-4"
        : "md:grid-cols-3";

  return (
    <div className={cx("grid border-t border-line", colClass)}>
      {items.map((item, i) => (
        <div
          key={i}
          className="border-b border-line py-7 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {item.kicker ?? String(i + 1).padStart(2, "0")}
          </p>
          <p className="mt-4 font-display text-xl font-semibold leading-snug text-ink">
            {item.title}
          </p>
          <div className="mt-3 text-[15px] leading-7 text-ink-2">
            {item.body}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Figure: a framed image, shown once
--------------------------------------------------------- */

export function Figure({
  src,
  alt,
  caption,
  ratio = "aspect-[16/10]",
  contain = true,
  priority,
  className,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  ratio?: string;
  contain?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={cx(
          "relative w-full overflow-hidden border border-line bg-paper-2",
          ratio
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={contain ? "object-contain p-6 sm:p-10" : "object-cover"}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------------------------------
   Stats row
--------------------------------------------------------- */

export function Stats({
  items,
}: {
  items: Array<{ value: ReactNode; label: ReactNode }>;
}) {
  return (
    <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
      {items.map((s, i) => (
        <div
          key={i}
          className="border-b border-line py-6 pr-4 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
        >
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {s.label}
          </dt>
          <dd className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------
   Buttons
--------------------------------------------------------- */

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2 text-sm font-semibold transition-colors";
  const styles =
    variant === "solid"
      ? "bg-accent px-5 py-3 text-accent-ink hover:bg-ink hover:text-paper"
      : variant === "outline"
        ? "border border-ink px-5 py-3 text-ink hover:bg-ink hover:text-paper"
        : "border-b border-current pb-0.5 text-ink hover:text-accent";

  return (
    <Link href={href} className={cx(base, styles, className)}>
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/* ---------------------------------------------------------
   Small tag
--------------------------------------------------------- */

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
      {children}
    </span>
  );
}

/* ---------------------------------------------------------
   Form field styles (for client form pages to reuse)
--------------------------------------------------------- */

export const fieldClass =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0";

export const labelClass =
  "font-mono text-[11px] uppercase tracking-[0.16em] text-muted";
