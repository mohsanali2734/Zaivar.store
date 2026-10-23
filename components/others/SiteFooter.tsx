import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaWhatsapp } from "react-icons/fa6";import { CATS, CONFIG, FOOTER_CARE, SITE } from "@/lib/products";



const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/zaivar.info/",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61595752559876",
    icon: FaFacebookF,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@zaivarstore",
    icon: FaTiktok,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/zaivarstore",
    icon: FaXTwitter,
  },
];

const WHATSAPP_NUMBER = "03157337056";
const WHATSAPP_INTL = "+923157337056";
const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029Vb8mo4iBadmdohaXcz0h";

const toIntl = (p: string) => "+92" + p.replace(/\D/g, "").replace(/^0/, "");

export default function SiteFooter() {
  return (
    <>
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

              {/* Social Media Icons */}
              <ul className="mt-6 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow ${SITE.name} on ${s.label}`}
                        className="flex size-9 items-center justify-center rounded-full bg-beige/10 text-beige transition-colors hover:bg-gold hover:text-obs"
                      >
                        <Icon className="size-4.5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
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
                  <a
                    href={`https://wa.me/${WHATSAPP_INTL.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    WhatsApp: {WHATSAPP_NUMBER}
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

      {/* Floating Always-Visible WhatsApp Channel Button */}
      <a
        href={WHATSAPP_CHANNEL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our WhatsApp Channel"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl transition-all hover:scale-105 hover:bg-[#20ba5a] active:scale-95"
      >
        <FaWhatsapp className="size-6 fill-white text-[#25D366]" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
          Join Channel
        </span>
      </a>
    </>
  );
}