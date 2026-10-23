export const CATEGORIES = [
  {
    name: "Earrings",
    slug: "earrings",
    image: "/img/categories/earing.png", 
    alt: "Gold plated jhumka earrings and stud earrings",
    blurb: "Jhumka earrings, studs & statement drops",
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    image: "/img/categories/necklaces.png",
    alt: "Kundan choker and layered artificial necklaces",
    blurb: "Kundan chokers, layered & pendant styles",
  },
  {
    name: "Rings",
    slug: "rings",
    image: "/img/categories/rings.png",
    alt: "Adjustable cocktail rings and stackable rings",
    blurb: "Stackable & adjustable rings",
  },
  {
    name: "Bangles & Bracelets",
    slug: "bangles-bracelets",
    image: "/img/categories/bangles.png",
    alt: "Festive gold-tone bangles and charm bracelets",
    blurb: "Gold-tone bangle stacks made for celebrations",
  },
  {
    name: "Jewellery Sets",
    slug: "jewellery-sets",
    image: "/img/categories/sets.png",
    alt: "Complete bridal and festive jewellery sets",
    blurb: "Matching bridal & festive sets, zero guesswork",
  },
] as const;

// ---------- Types ----------
export type CategoryName = (typeof CATEGORIES)[number]["name"];
export type Category = (typeof CATEGORIES)[number];
export type ProductTag =
  | "Bestseller"
  | "New"
  | "Sale"
  | "Popular"
  | "Trending"
  | "Everyday Essential"
  | "New Arrival"
  | "Festive Pick"
  | "Minimalist"
  | "Bridal Favourite";
export type Finish = "Gold" | "Yellow Gold" | "Antiqued Gold" | "Rose Gold" | "Oxidised" | "Silver";

export interface Product {
  id: string;
  slug: string;
  name: string;
  cat: CategoryName;
  price: number;
  comparePrice?: number;
  tag?: ProductTag;
  subCat?:string;
  image: string;
  hoverImage: string;
  alt: string;
  rating: number;
  reviews: number;
  material: string;
  finish?: Finish;
  colour: string;
  stock: number;
  desc: string;
}

export interface Stat { value: string; label: string }
export interface TrustPoint { icon: string; title: string; text: string }
export interface Testimonial {
  name: string;
  city: string;
  text: string;
  image: string;
  rating: number;
}
export interface Faq { q: string; a: string }
export interface InfoPage {
  title: string;
  intro: string;
  body: { h: string; p: string }[];
}

export const SITE = {
  name: "ZAIVAR",
  url: "https://zaivar.store",
  title: "ZAIVAR | Artificial Jewellery Online in Pakistan",
  description:
    "Shop artificial jewellery in Pakistan: jhumkas, kundan sets, bangles & rings. Anti-tarnish plating, cash on delivery and 7-day returns.",
  keywords: [
    "artificial jewellery online",
    "jhumka earrings",
    "kundan necklace set",
    "imitation jewellery",
    "festive jewellery",
    "gold plated bangles",
  ],
  ogImage: "/img/logo.png",
  currency: "PKR",
};

export const CONFIG = {
  announce: [
    "Free shipping on orders over Rs. 3,000",
    "Cash on delivery across Pakistan",
    "New festive drop is live ✦",
    "7-day easy returns",
  ],
  email: "zaivar.info@gmail.com",
  // TODO: replace these two placeholders with your REAL numbers before launch.
  phone: "+92 300 0000000",
  whatsapp: "923001234567",
  freeShipping: 3000,
  shippingFee: 250,
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/zaivar.info/" },
    { label: "TikTok", href: "https://www.tiktok.com/@zaivarstore" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61595752559876" },
  ],
};

export const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?tag=New" },
  { label: "Bestsellers", href: "/shop?tag=Bestseller" },
  { label: "About", href: "/about" },
];

export const FOOTER_CARE = [
  { label: "Shipping", href: "/shipping" },
  { label: "Returns & Exchange", href: "/returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad",
  "Azad Kashmir",
  "Gilgit-Baltistan",
];

// ---------- Home content ----------
export const HERO = {
  eyebrow: "The Festive Edit — 2026",
  title: "Jewellery That Makes",
  highlight: "Every Moment Yours.",
  description:
    "Discover thoughtfully curated artificial jewellery in Pakistan, designed to bring timeless elegance to every celebration.",
  image: "/img/heros.png",
  imageAlt: "Model wearing ZAIVAR gold jhumkas, kundan necklace and maang tikka",
  primaryCta: { label: "Shop Collection", href: "/shop" },
  secondaryCta: { label: "Explore Bestsellers", href: "/shop?tag=Bestseller" },
  floatingProduct: "kundan-bridal-set", 
  sticker: "New Drop",
};

// NOTE: unchanged. Confirm these figures are real and verifiable before keeping them.
export const HERO_STATS: Stat[] = [
  { value: "50K+", label: "Happy customers" },
  { value: "4.8★", label: "Average rating" },
  { value: "7 Days", label: "Easy returns" },
];

export const MARQUEE_ITEMS = [
  "Free shipping over Rs. 3,000",
  "Anti-tarnish finish",
  "Cash on delivery",
  "7-day easy returns",
  "Festive gifting ready",
  "Lightweight & skin-safe",
];

export const TRUST_POINTS: TrustPoint[] = [
  { icon: "✦", title: "Anti-Tarnish Plating", text: "Premium gold-tone finish that keeps its shine." },
  { icon: "☘", title: "Skin-Safe Materials", text: "Nickel-free, lightweight and comfy all day." },
  { icon: "❖", title: "Gift-Ready Packaging", text: "Arrives in a keepsake box, ready to surprise." },
  { icon: "↺", title: "7-Day Easy Returns", text: "Change of mind? Exchange or return, no stress." },
];

export const STORY = {
  eyebrow: "Our Story",
  title: "A Little Detail. A Lasting Impression.",
  text: "ZAIVAR celebrates the beauty of thoughtful details. Our collections bring together contemporary styling and South Asian inspiration, helping you find jewellery that feels special for everyday moments and life's most memorable occasions.",
  image: "/img/categories/story-detail.png",
  imageAlt: "ZAIVAR artisan arranging a kundan jewellery set",
  secondImage: "/img/categories/story-main.png",
  secondImageAlt: "Close-up of handcrafted kundan detailing",
  cta: { label: "Discover Our Story", href: "/about" },
  points: ["Designed in-house", "Inspired by South Asian craft", "Made for everyday & occasions"],
};

// NOTE: unchanged. Confirm these testimonials are from real customers.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Areeba Khawaja",
    city: "Lahore",
    text: "The jhumkas look so real and weigh nothing. Got compliments the entire wedding!",
    image: "/img/areeba.png",
    rating: 5,
  },
  {
    name: "Hira M.",
    city: "Karachi",
    text: "Packaging was gorgeous and the set matched my outfit perfectly. Already ordering again.",
    image: "/img/hira.png",
    rating: 5,
  },
  {
    name: "Sana R.",
    city: "Islamabad",
    text: "Two months of regular wear and zero tarnish. Honestly worth every rupee.",
    image: "/img/sana.png",
    rating: 5,
  },
];

export const FAQS: Faq[] = [
  {
    q: "Is ZAIVAR artificial jewellery anti-tarnish?",
    a: "Yes. Every piece has a protective gold-tone plating. Store it dry, away from perfume and water, to keep the shine for months.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes, cash on delivery is available across Pakistan, along with card and wallet payments.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders arrive in 2 to 4 working days in major cities and 4 to 6 days elsewhere.",
  },
  {
    q: "Can I return or exchange a piece?",
    a: "Absolutely. You have 7 days from delivery to return or exchange unworn items in original packaging.",
  },
  {
    q: "How much does shipping cost in Pakistan?",
    a: `Shipping is free on orders over Rs. ${CONFIG.freeShipping.toLocaleString("en-PK")}. Below that, a flat fee of Rs. ${CONFIG.shippingFee} applies.`,
  },
  {
    q: "Do you deliver all over Pakistan?",
    a: "Yes. We deliver across Pakistan, including Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad, Azad Kashmir and Gilgit-Baltistan.",
  },
  {
    q: "Is ZAIVAR jewellery suitable for weddings and festive occasions?",
    a: "Yes. Our jhumkas, kundan necklaces, bangle stacks and matching sets are designed for weddings, Eid and mehndi, and many pieces also work for everyday wear.",
  },
  {
    q: "How do I start a return or exchange?",
    a: `Email ${CONFIG.email} with your order number and we will arrange a pickup.`,
  },
];

export const NEWSLETTER = {
  title: "Letters from ZAIVAR",
  text: "Discover new collections, styling inspiration, and occasional exclusive offers.",
  perk: "New drops · Styling inspiration",
  shopLabel: "Shop now",
  shopHref: "/shop",
  secondLabel: "Chat on WhatsApp",
  secondHref: `https://wa.me/${CONFIG.whatsapp}?text=Hi%20ZAIVAR%2C%20I%20want%20to%20know%20about%20new%20drops`,
};

// ---------- Info pages (About, Shipping, Returns, FAQ, Privacy) ----------
// Must stay below STORY, FAQS and CONFIG because it uses them.
export const INFO_PAGES: Record<string, InfoPage> = {
  about: {
    title: "About ZAIVAR",
    intro: "Elegance in every detail.",
    body: [
      { h: "Who we are", p: STORY.text },
      {
        h: "What we make",
        p: "Artificial jewellery designed in-house, inspired by South Asian craft and finished with an anti-tarnish plating so it lasts beyond one season.",
      },
      {
        h: "What you can shop",
        p: "Browse jhumka earrings, kundan necklaces, stackable rings, festive bangles and complete bridal and festive jewellery sets, all delivered across Pakistan.",
      },
    ],
  },
  shipping: {
    title: "Shipping",
    intro: "Fast, tracked delivery across Pakistan.",
    body: [
      { h: "Delivery times", p: "2 to 4 working days in major cities, 4 to 6 days elsewhere." },
      {
        h: "Shipping cost",
        p: `Free over Rs. ${CONFIG.freeShipping.toLocaleString("en-PK")}. Otherwise a flat Rs. ${CONFIG.shippingFee}.`,
      },
      {
        h: "Payment options",
        p: "Cash on delivery is available across Pakistan, along with card and wallet payments.",
      },
    ],
  },
  returns: {
    title: "Returns & Exchange",
    intro: "Changed your mind? No stress.",
    body: [
      { h: "7-day window", p: "Return or exchange unworn items in original packaging within 7 days of delivery." },
      { h: "How to start", p: `Email ${CONFIG.email} with your order number and we will arrange a pickup.` },
    ],
  },
  faq: {
    title: "FAQ",
    intro: "Quick answers to common questions.",
    body: FAQS.map((f) => ({ h: f.q, p: f.a })),
  },
  privacy: {
    title: "Privacy Policy",
    intro: "How we handle your data.",
    body: [
      { h: "What we collect", p: "Only the details needed to deliver your order: name, phone, address and email." },
      { h: "Your choices", p: `Ask us to delete your data anytime at ${CONFIG.email}.` },
    ],
  },
};

// ---------- Products ----------
const img = (name: string) => `/images/products/${name}.jpg`;

// NOTE: rating and reviews are unchanged. They feed AggregateRating schema,
// so keep them only if they come from real customer reviews.
export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "royal-kundan-jhumkas",
    name: "Royal Kundan Jhumkas",
    cat: "Earrings",
    subCat: "Jhumkas",
    price: 2890,
    comparePrice: 3400,
    tag: "Bestseller",
    image: "/img/categories/earing/royal-kundan-jhumkas.png",
    hoverImage: "/img/categories/earing/royal-kundan-jhumkas-2.png",
    alt: "Royal Kundan Jhumkas with delicate pearl drop fringe",
    rating: 4.9,
    reviews: 312,
    material: "Brass with Kundan Stones & Pearls",
    finish: "Antiqued Gold",
    colour: "Gold / Ivory",
    stock: 18,
    desc: "Royal Kundan Jhumkas are temple-style jhumka earrings in antiqued gold, set with kundan stones and trimmed with a cluster of mini seed pearls and a delicate pearl drop fringe. The brass base gives them a regal, traditional look that suits weddings, Eid and festive outfits. The gold and ivory tones pair well with both bright and pastel kurtas.",
  },
  {
    id: "p2",
    slug: "floral-kundan-studs",
    name: "Floral Kundan Studs",
    cat: "Earrings",
    subCat: "Studs",
    price: 1490,
    comparePrice: 1800,
    tag: "Popular",
    image: "/img/categories/earing/floral-kundan-studs.png",
    hoverImage: "/img/categories/earing/floral-kundan-studs-2.png",
    alt: "Circular flower Kundan stud earrings in gold",
    rating: 4.8,
    reviews: 145,
    material: "Gold-plated alloy with uncut stones",
    finish: "Gold",
    colour: "Clear / Gold",
    stock: 22,
    desc: "Floral Kundan Studs are circular, bloom-inspired stud earrings in gold plating, with glass stone petals set around a brilliant centre. They are comfortable for all-day wear and easy to pair with traditional or western outfits, a simple kundan upgrade for days when jhumkas feel like too much.",
  },
  {
    id: "p3",
    slug: "teardrop-crystal-statement-drops",
    name: "Teardrop Crystal Statement Drops",
    cat: "Earrings",
    subCat: "Statement Drops",
    price: 2190,
    comparePrice: 2600,
    tag: "Trending",
    image: "/img/categories/earing/teardrop-crystal-drops.png",
    hoverImage: "/img/categories/earing/teardrop-crystal-drops-2.png",
    alt: "Teardrop shaped crystal statement drop earrings",
    rating: 4.9,
    reviews: 98,
    material: "Cubic Zirconia & Brass",
    finish: "Gold",
    colour: "Crystal / Gold",
    stock: 12,
    desc: "Teardrop Crystal Statement Drops feature a dramatic teardrop cubic zirconia stone encased in a pave-set halo frame with a gold finish. The crystal catches the light with every movement, making them a strong choice for evening events, dinners and festive nights when you want one standout piece.",
  },
  {
    id: "p4",
    slug: "textured-gold-hoops",
    name: "Textured Gold Hoops",
    cat: "Earrings",
    subCat: "Hoops",
    price: 1290,
    tag: "Everyday Essential",
    image: "/img/categories/earing/textured-gold-hoops.png",
    hoverImage: "/img/categories/earing/textured-gold-hoops-2.png",
    alt: "Embossed textured gold huggie hoop earrings",
    rating: 4.7,
    reviews: 210,
    material: "18k Gold-plated stainless steel",
    finish: "Gold",
    colour: "Gold",
    stock: 30,
    desc: "Textured Gold Hoops are chunky hinged hoop earrings with a fine beaded border, made from 18k gold-plated stainless steel. They are hypoallergenic and tarnish-resistant, designed as an everyday essential you can wear daily and style with studs or on their own.",
  },
  {
    id: "p5",
    slug: "pearl-cluster-bloom-studs",
    name: "Pearl Cluster Bloom Studs",
    cat: "Earrings",
    subCat: "Pearl Studs",
    price: 1390,
    comparePrice: 1650,
    tag: "New Arrival",
    image: "/img/categories/earing/pearl-cluster-bloom-studs.png",
    hoverImage: "/img/categories/earing/pearl-cluster-bloom-studs-2.png",
    alt: "Gold floral stud earrings with pearl dangles",
    rating: 4.6,
    reviews: 64,
    material: "Faux Pearls & Brass",
    finish: "Gold",
    colour: "Ivory / Gold",
    stock: 15,
    desc: "Pearl Cluster Bloom Studs are gold sunburst-motif studs anchored with a triple faux pearl cluster dangle. Sweet and feminine, they suit day events, family gatherings and festive lunches, and pair easily with simple kurtas as well as western outfits.",
  },
  {
    id: "p6",
    slug: "emerald-meenakari-jhumkas",
    name: "Emerald Meenakari Jhumkas",
    cat: "Earrings",
    subCat: "Traditional Jhumkas",
    price: 3190,
    comparePrice: 3800,
    tag: "Festive Pick",
    image: "/img/categories/earing/emerald-meenakari-jhumkas.png",
    hoverImage: "/img/categories/earing/emerald-meenakari-jhumkas-2.png",
    alt: "Green Meenakari enamel traditional jhumkas with pearls",
    rating: 5.0,
    reviews: 178,
    material: "Brass with Emerald Enamel & Pearls",
    finish: "Antiqued Gold",
    colour: "Green / Gold",
    stock: 8,
    desc: "Emerald Meenakari Jhumkas are traditional jhumka earrings with hand-painted rich green Meenakari enamel, floral kundan tops and soft pearl tassels, set in antiqued gold-toned brass. A festive pick for Eid, mehndi and wedding functions that adds a deep pop of colour to ivory, white or gold outfits.",
  },
  {
    id: "p7",
    slug: "baguette-crystal-minimal-drops",
    name: "Baguette Crystal Minimal Drops",
    cat: "Earrings",
    subCat: "Minimal Drops",
    price: 1590,
    tag: "Minimalist",
    image: "/img/categories/earing/baguette-crystal-minimal-drops.png",
    hoverImage: "/img/categories/earing/baguette-crystal-minimal-drops-2.png",
    alt: "Square baguette crystal drop earrings on gold hooks",
    rating: 4.8,
    reviews: 82,
    material: "High-grade Glass Crystal & Alloy",
    finish: "Gold",
    colour: "Clear Glass / Gold",
    stock: 25,
    desc: "Baguette Crystal Minimal Drops are clean, geometric drop earrings with emerald-cut glass crystal pendants hanging from round gold stud tops. A minimalist pair for office wear, dinners and modern festive looks when you prefer subtle sparkle to heavy jhumkas.",
  },
  {
    id: "p8",
    slug: "crystal-floral-pearl-drops",
    name: "Crystal Floral Pearl Drops",
    cat: "Earrings",
    subCat: "Floral Earrings",
    price: 1990,
    comparePrice: 2450,
    tag: "Bridal Favourite",
    image: "/img/categories/earing/crystal-floral-pearl-drops.png",
    hoverImage: "/img/categories/earing/crystal-floral-pearl-drops-2.png",
    alt: "Flower shaped crystal earrings with teardrop pearl accent",
    rating: 4.9,
    reviews: 124,
    material: "Cubic Zirconia & Shell Pearl",
    finish: "Yellow Gold",
    colour: "Gold / Pearl",
    stock: 10,
    desc: "Crystal Floral Pearl Drops combine a radiant starburst flower top adorned with marquise-cut stones and a luminous teardrop shell pearl, in a yellow gold finish. A bridal favourite that also works for engagement events, wedding functions and formal evenings.",
  },
 
  {
    id: "p9",
    slug: "kundan-choker",
    name: "Kundan Choker",
    cat: "Necklaces",
    subCat: "Chokers",
    price: 3490,
    comparePrice: 4200,
    tag: "Bestseller",
    image: "/img/categories/necklaces/kundan-choker.png",
    hoverImage: "/img/categories/necklaces/kundan-choker-2.png",
    alt: "Gold and red kundan choker necklace",
    rating: 4.8,
    reviews: 241,
    material: "Kundan Stones",
    finish: "Gold",
    colour: "Gold & Red",
    stock: 12,
    desc: "The Kundan Choker is a statement choker necklace with hand-set kundan stones in gold and red, finished with an adjustable dori back for a comfortable fit. Pair it with jhumkas for weddings, mehndi and festive nights, or wear it on its own with a plain neckline.",
  },
  {
    id: "p10",
    slug: "layered-star-necklace",
    name: "Layered Star Necklace",
    cat: "Necklaces",
    subCat: "Pendant Necklaces",
    price: 1590,
    tag: "New",
    image: "/img/categories/necklaces/layered-star-necklace.png",
    hoverImage: "/img/categories/necklaces/layered-star-necklace-2.png",
    alt: "Delicate layered necklace with star pendants",
    rating: 4.6,
    reviews: 54,
    material: "Gold-plated alloy",
    finish: "Rose Gold",
    colour: "Rose Gold",
    stock: 30,
    desc: "The Layered Star Necklace features two delicate rose gold chains with tiny star charms for an easy layered look. It works with kurtas, tees and casual outfits alike, making it a simple everyday pendant necklace and an easy gift idea.",
  },
  {
    id: "p11",
    slug: "stackable-sparkle-ring",
    name: "Stackable Sparkle Ring",
    cat: "Rings",
    subCat: "Stackable Rings",
    price: 790,
    tag: "Bestseller",
    image: "/img/categories/rings/stackable-sparkle-ring.png",
    hoverImage: "/img/categories/rings/stackable-sparkle-ring-2.png",
    alt: "Adjustable stackable sparkle ring",
    rating: 4.8,
    reviews: 198,
    material: "Zircon",
    finish: "Silver",
    colour: "Silver",
    stock: 60,
    desc: "The Stackable Sparkle Ring is a thin zircon band in a silver finish, adjustable to fit most fingers. Wear one for subtle sparkle or stack two or three for the full look. The adjustable size also makes it an easy gift.",
  },
  {
    id: "p12",
    slug: "cocktail-gem-ring",
    name: "Cocktail Gem Ring",
    cat: "Rings",
    subCat: "Statement Rings",
    price: 990,
    tag: "New",
    image: "/img/categories/rings/cocktail-gem-ring.png",
    hoverImage: "/img/categories/rings/cocktail-gem-ring-2.png",
    alt: "Oversized emerald-green cocktail gem ring",
    rating: 4.5,
    reviews: 37,
    material: "Resin Gem",
    finish: "Oxidised",
    colour: "Green",
    stock: 0,
    desc: "The Cocktail Gem Ring is a bold statement ring with an oversized emerald-tone resin gem on an oxidised setting. It is a simple way to upgrade a one-piece outfit and works well with both traditional and western looks.",
  },
  {
    id: "p13",
    slug: "festive-bangle-stack",
    name: "Festive Bangle Stack",
    cat: "Bangles & Bracelets",
    subCat: "Bangles",
    price: 2190,
    comparePrice: 2790,
    tag: "Bestseller",
    image: "/img/categories/bangles-bracelets/festive-bangle-stack.png",
    hoverImage: "/img/categories/bangles-bracelets/festive-bangle-stack-2.png",
    alt: "Set of six festive gold-tone bangles",
    rating: 4.9,
    reviews: 276,
    material: "Gold-tone alloy",
    finish: "Gold",
    colour: "Gold",
    stock: 18,
    desc: "The Festive Bangle Stack is a set of six gold-tone bangles mixing plain and textured finishes, ready stacked for Eid, mehndi and wedding functions. Wear the full set together for a traditional look, or split the bangles across both wrists.",
  },
  {
    id: "p14",
    slug: "charm-bracelet",
    name: "Charm Bracelet",
    cat: "Bangles & Bracelets",
    subCat: "Bracelets",
    price: 1190,
    tag: "New",
    image: "/img/categories/bangles-bracelets/charm-bracelet.png",
    hoverImage: "/img/categories/bangles-bracelets/charm-bracelet-2.png",
    alt: "Gold charm bracelet with moon, star and evil-eye charms",
    rating: 4.6,
    reviews: 61,
    material: "Gold-plated chain",
    finish: "Gold",
    colour: "Gold",
    stock: 22,
    desc: "The Charm Bracelet is a dainty gold-plated chain bracelet with moon, star and evil-eye charms and an adjustable clasp. A small, meaningful piece for everyday wear and an easy gift idea for birthdays and festive occasions.",
  },
  {
    id: "p15",
    slug: "kundan-bridal-set",
    name: "Kundan Bridal Set",
    cat: "Jewellery Sets",
    subCat: "Bridal Sets",
    price: 5990,
    comparePrice: 7500,
    tag: "Bestseller",
    image: "/img/categories/jewellery-sets/kundan-bridal-set.png",
    hoverImage: "/img/categories/jewellery-sets/kundan-bridal-set-2.png",
    alt: "Kundan bridal necklace, jhumkas and maang tikka set",
    rating: 5.0,
    reviews: 402,
    material: "Kundan & Pearls",
    finish: "Gold",
    colour: "Gold & Pearl",
    stock: 8,
    desc: "The Kundan Bridal Set brings a kundan-and-pearl necklace, jhumkas and maang tikka together in one matching gold jewellery set, so there is no guesswork when dressing for a wedding or bridal event. It arrives in a keepsake box, ready to gift.",
  },
  {
    id: "p16",
    slug: "emerald-festive-set",
    name: "Emerald Festive Set",
    cat: "Jewellery Sets",
    subCat: "Festive Sets",
    price: 4590,
    tag: "New",
    image: "/img/categories/jewellery-sets/emerald-festive-set.png",
    hoverImage: "/img/categories/jewellery-sets/emerald-festive-set-2.png",
    alt: "Emerald-green festive necklace and matching earrings",
    rating: 4.8,
    reviews: 73,
    material: "Glass Stones",
    finish: "Gold",
    colour: "Emerald Green",
    stock: 10,
    desc: "The Emerald Festive Set pairs a choker-length necklace with matching earrings, made with deep emerald-green glass stones in a gold-tone setting. A coordinated jewellery set for Eid, mehndi and festive dinners that works with white, black or gold outfits.",
  },
 
];

// ---------- Helpers ----------
export const CATS: CategoryName[] = CATEGORIES.map((c) => c.name);
export const FINISHES: Finish[] = ["Gold", "Rose Gold", "Silver", "Oxidised"];

export const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;

export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const byId = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getByTag = (tag: ProductTag) => PRODUCTS.filter((p) => p.tag === tag);

export const getRelated = (p: Product, n = 4) =>
  [
    ...PRODUCTS.filter((x) => x.id !== p.id && x.cat === p.cat),
    ...PRODUCTS.filter((x) => x.id !== p.id && x.cat !== p.cat),
  ].slice(0, n);