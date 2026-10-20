import Link from "next/link";
import Image from "next/image";
import { CATS, CONFIG, FOOTER_CARE, SITE } from "@/lib/products";

const toIntl = (p: string) => "+92" + p.replace(/\D/g, "").replace(/^0/, "");

export default function SiteFooter() {
  return (
    <footer className="bg-obs text-beige">
      <div className="wrap py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Logo Section */}
          <div>
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/img/logo.png"
                alt={`${SITE.name} Logo`}
                width={160}
                height={64}
                className="h-16 w-auto max-w-[180px] object-contain drop-shadow-sm brightness-110"
                priority
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm text-beige/70">
              Elegance in every detail. Artificial jewellery for festive and everyday style.
            </p>

            {CONFIG.socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4">
                {CONFIG.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-widest text-beige/70 transition-colors hover:text-gold"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Shop Links */}
          <nav aria-label="Shop categories">
            <h3 className="mb-4 !font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Shop
            </h3>
            <ul className="space-y-2 text-sm">
              {CATS.map((c) => (
                <li key={c}>
                  <Link
                    href={`/shop?cat=${encodeURIComponent(c)}`}
                    className="text-beige/70 transition-all hover:pl-1 hover:text-gold"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Customer Care Links */}
          <nav aria-label="Customer care">
            <h3 className="mb-4 !font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Care
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_CARE.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-beige/70 transition-all hover:pl-1 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 !font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Contact
            </h3>
            <address className="space-y-2 text-sm not-italic text-beige/70">
              <p>
                <a href={`mailto:${CONFIG.email}`} className="hover:text-gold">
                  {CONFIG.email}
                </a>
              </p>
              <p>
                <a href={`tel:${toIntl(CONFIG.phone)}`} className="hover:text-gold">
                  {CONFIG.phone}
                </a>
              </p>
              <p>
                <a
                  href={`https://wa.me/${CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  WhatsApp us
                </a>
              </p>
              <p>Pakistan · PKR</p>
            </address>
          </div>
        </div>

        {/* Bottom Bar with Developer Credit */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-beige/10 pt-6 text-xs text-beige/50 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>

          <p>
            Designed & Developed by{" "}
            <a
              href="https://www.linkedin.com/in/mohsan-ali-435495301/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-beige/70 underline underline-offset-4 transition-colors hover:text-gold"
            >
              Mohsan Ali
            </a>
          </p>

          <p>Cash on delivery · 7-day returns</p>
        </div>
      </div>
    </footer>
  );
}