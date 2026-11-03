/**
 * Mock content for the website and shop examples (Storybook only). No real or invented brand
 * names: makers are "Example …", addresses use example.com, pictures come from picsum.photos by
 * seed.
 */
import type { NavLink } from '../patterns/organisms/NavBar.svelte';
import type { Feature } from '../patterns/organisms/FeatureGrid.svelte';
import type { PricingPlan } from '../patterns/organisms/PricingTable.svelte';
import type { FaqItem } from '../patterns/organisms/Faq.svelte';
import type { FooterColumn, FooterLink, SocialLink } from '../patterns/organisms/SiteFooter.svelte';
import type { Product } from '../patterns/organisms/ProductGrid.svelte';
import type { Logo } from '../patterns/molecules/LogoCloud.svelte';
import type { VariantOption } from '../patterns/molecules/VariantPicker.svelte';
import type { GalleryImage } from '../patterns/organisms/ProductGallery.svelte';

/** A picsum photo by seed, so the same seed always shows the same picture. */
export const photo = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ── Website ─────────────────────────────────────────────────────────────────────────────

export const siteLinks: NavLink[] = [
  { label: 'Product', href: '#top', active: true },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#customers' },
  { label: 'FAQ', href: '#faq' },
];

export const logos: Logo[] = [
  { name: 'Example Corp' },
  { name: 'Example Labs' },
  { name: 'Example Health' },
  { name: 'Example Freight' },
  { name: 'Example Bank' },
  { name: 'Example Media' },
];

export const features: Feature[] = [
  {
    icon: 'bolt',
    title: 'Instant sync',
    text: 'Every change lands on every device in milliseconds — even with a spotty connection.',
  },
  {
    icon: 'users',
    title: 'Made for teams',
    text: 'Shared spaces, mentions and roles, so everyone sees what matters to them.',
  },
  {
    icon: 'lock',
    title: 'Private by default',
    text: 'End-to-end encryption and single sign-on, without a single setting to toggle.',
  },
  {
    icon: 'sparkles',
    title: 'Smart suggestions',
    text: 'Drafts, summaries and next steps written for you, ready to accept or tweak.',
  },
  {
    icon: 'chart',
    title: 'Insights that explain',
    text: 'Dashboards that tell you why a number moved, not just that it did.',
  },
  {
    icon: 'layers',
    title: 'Works with your tools',
    text: 'Two-way connections to calendars, mail and storage — set up in a click.',
  },
];

export const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 0,
    description: 'For trying things out on your own.',
    features: [
      'One workspace',
      'Up to 3 projects',
      'Community support',
      { label: 'Team roles', included: false },
      { label: 'Single sign-on', included: false },
    ],
    ctaLabel: 'Start for free',
  },
  {
    id: 'team',
    name: 'Team',
    monthly: 15,
    yearly: 12,
    description: 'For small teams shipping together.',
    features: [
      'Unlimited projects',
      'Team roles and guests',
      'Smart suggestions',
      'Priority support',
      { label: 'Single sign-on', included: false },
    ],
    highlighted: true,
    badge: 'Most popular',
    ctaLabel: 'Start free trial',
  },
  {
    id: 'business',
    name: 'Business',
    monthly: 32,
    yearly: 26,
    description: 'For organisations with more to manage.',
    features: [
      'Everything in Team',
      'Single sign-on',
      'Audit log and data residency',
      'Dedicated success manager',
    ],
    ctaLabel: 'Contact sales',
  },
];

export const testimonials = [
  {
    quote:
      'We replaced three tools with this one. Planning meetings got shorter and nobody asks where a file lives anymore.',
    name: 'Mara Jensen',
    role: 'Head of Operations, design studio',
    avatar: photo('mara', 96, 96),
    rating: 5,
  },
  {
    quote:
      'Setup took an afternoon. The sync is so fast that it feels like everyone sits in one room.',
    name: 'Tomás Ruiz',
    role: 'Engineering Lead, logistics start-up',
    avatar: photo('tomas', 96, 96),
    rating: 5,
  },
  {
    quote:
      'The suggestions are scarily good. Our weekly report now writes itself — we just check it.',
    name: 'Aiko Tanaka',
    role: 'Product Manager, travel company',
    avatar: photo('aiko', 96, 96),
    rating: 4,
  },
];

export const faqs: FaqItem[] = [
  {
    question: 'Is there really a free plan?',
    answer:
      'Yes. Starter is free forever for one person and up to three projects. No card needed to sign up.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Any time. Upgrades apply at once and are charged pro rata; downgrades take effect at the end of the billing period.',
  },
  {
    question: 'Where is my data stored?',
    answer:
      'In data centres in the EU by default. Business plans can choose the region.\n\nEverything is encrypted at rest and in transit.',
  },
  {
    question: 'Do you offer discounts for non-profits and schools?',
    answer: 'We do — write to hello@example.com from your organisation’s address and we set it up.',
  },
  {
    question: 'How do I cancel?',
    answer: 'In Settings → Billing, with one click. You keep access until the period ends.',
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#changelog' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press', href: '#press' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Guides', href: '#guides' },
      { label: 'Status', href: '#status' },
      { label: 'Community', href: '#community' },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { label: 'Imprint', href: '#imprint' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
];

export const socialLinks: SocialLink[] = [
  { label: 'Newsletter', href: '#newsletter', icon: 'mail' },
  { label: 'Community chat', href: '#chat', icon: 'chat' },
  { label: 'Blog', href: '#blog', icon: 'globe' },
];

// ── Shop ────────────────────────────────────────────────────────────────────────────────

/** Each link is a ready-made filter of the product grid (see ShopStorefront). */
export const shopLinks: NavLink[] = [
  { label: 'All', href: '#all', active: true },
  { label: 'New in', href: '#new' },
  { label: 'Knitwear', href: '#knitwear' },
  { label: 'Home', href: '#home' },
  { label: 'Sale', href: '#sale' },
];

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'tops', label: 'Tops' },
  { value: 'knitwear', label: 'Knitwear' },
  { value: 'bags', label: 'Bags' },
  { value: 'home', label: 'Home' },
];

export interface ShopProduct extends Product {
  category: string;
  description: string;
}

const SAGE = '#9bb59a';
const SAND = '#e3d5bd';
const INK = '#2f3640';
const RUST = '#c0623f';
const SKY = '#8fb3d9';
const PLUM = '#7b4b6a';

export const products: ShopProduct[] = [
  {
    id: 'linen-shirt',
    title: 'Relaxed linen shirt',
    subtitle: 'Example Studio',
    category: 'tops',
    price: 59,
    compareAt: 79,
    rating: 4.6,
    reviews: 128,
    colors: [SAGE, SAND, INK, SKY],
    image: photo('linen-shirt'),
    imageAlt: 'Linen shirt on a hanger',
    description:
      'Washed European linen with a soft hand and a loose, boxy fit. Gets better with every wash.',
  },
  {
    id: 'merino-crew',
    title: 'Merino crew knit',
    subtitle: 'Example Studio',
    category: 'knitwear',
    price: 89,
    rating: 4.8,
    reviews: 342,
    badge: 'Bestseller',
    colors: [INK, RUST, SAND],
    image: photo('merino-crew'),
    imageAlt: 'Folded merino jumper',
    description: 'Extra-fine merino, knitted seamless. Warm, breathable and never itchy.',
  },
  {
    id: 'canvas-tote',
    title: 'Waxed canvas tote',
    subtitle: 'Example Workshop',
    category: 'bags',
    price: 45,
    rating: 4.4,
    reviews: 76,
    badge: 'New',
    colors: [SAND, INK],
    image: photo('canvas-tote'),
    imageAlt: 'Canvas tote bag',
    description: 'Water-resistant waxed canvas with leather handles and an inner zip pocket.',
  },
  {
    id: 'ceramic-mug',
    title: 'Speckled ceramic mug',
    subtitle: 'Example Pottery',
    category: 'home',
    price: 18,
    rating: 4.9,
    reviews: 512,
    colors: [SAND, SKY, SAGE, PLUM, RUST, INK],
    image: photo('ceramic-mug'),
    imageAlt: 'Ceramic mug on a table',
    description: 'Hand-thrown stoneware, 350 ml. Dishwasher and microwave safe.',
  },
  {
    id: 'cord-overshirt',
    title: 'Corduroy overshirt',
    subtitle: 'Example Studio',
    category: 'tops',
    price: 74,
    compareAt: 99,
    rating: 4.3,
    reviews: 54,
    colors: [RUST, INK],
    image: photo('cord-overshirt'),
    imageAlt: 'Corduroy overshirt',
    description:
      'Mid-weight cotton corduroy with two chest pockets. Wear it open as a light jacket.',
  },
  {
    id: 'wool-blanket',
    title: 'Lambswool throw',
    subtitle: 'Example Mills',
    category: 'home',
    price: 129,
    rating: 4.7,
    reviews: 91,
    colors: [SAND, SAGE],
    image: photo('wool-blanket'),
    imageAlt: 'Wool blanket on a sofa',
    description: 'Woven from soft lambswool in a classic herringbone, 130 × 180 cm.',
  },
  {
    id: 'cable-cardigan',
    title: 'Chunky cable cardigan',
    subtitle: 'Example Studio',
    category: 'knitwear',
    price: 119,
    rating: 4.5,
    reviews: 38,
    soldOut: true,
    colors: [SAND],
    image: photo('cable-cardigan'),
    imageAlt: 'Cable knit cardigan',
    description: 'A heavy cable knit in undyed wool with horn buttons.',
  },
  {
    id: 'leather-pouch',
    title: 'Leather zip pouch',
    subtitle: 'Example Workshop',
    category: 'bags',
    price: 32,
    rating: 4.2,
    reviews: 23,
    badge: 'New',
    colors: [RUST, INK, SAGE],
    image: photo('leather-pouch'),
    imageAlt: 'Small leather pouch',
    description: 'Vegetable-tanned leather that ages beautifully. Fits a phone, keys and cards.',
  },
];

export const productColors: VariantOption[] = [
  { value: 'sage', label: 'Sage', color: SAGE },
  { value: 'sand', label: 'Sand', color: SAND },
  { value: 'ink', label: 'Ink', color: INK },
  { value: 'sky', label: 'Sky', color: SKY, disabled: true },
];

export const productSizes: VariantOption[] = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL', disabled: true },
];

export const galleryImages = (seed: string, count = 4): GalleryImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: photo(`${seed}-${i}`, 1000, 1000),
    thumb: photo(`${seed}-${i}`, 160, 160),
    alt: `Product photo ${i + 1}`,
  }));

export interface CartItem {
  id: string;
  title: string;
  meta: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartItems = (): CartItem[] => [
  {
    id: 'linen-shirt',
    title: 'Relaxed linen shirt',
    meta: 'Sage · M',
    price: 59,
    quantity: 1,
    image: photo('linen-shirt', 200, 200),
  },
  {
    id: 'ceramic-mug',
    title: 'Speckled ceramic mug',
    meta: 'Sky',
    price: 18,
    quantity: 2,
    image: photo('ceramic-mug', 200, 200),
  },
];

/** A pretend discount endpoint: SPRING10 takes 10% off, anything else is rejected. */
export async function applyCode(code: string): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (code.toUpperCase() !== 'SPRING10') throw new Error('invalid');
  return 0.1;
}

/** Shipping rules of the example shop, in euros. */
export const FREE_SHIPPING_FROM = 150;
export const SHIPPING = 4.9;
export const EXPRESS = 9.9;

const euro = new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' });
/** A price as the shop shows it ("€9.90"). */
export const money = (amount: number) => euro.format(amount);

/** A pretend network delay for async callbacks in stories. */
export const later = (ms = 700) => new Promise<void>((resolve) => setTimeout(resolve, ms));
