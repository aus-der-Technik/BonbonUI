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
export declare const photo: (seed: string, w?: number, h?: number) => string;
export declare const siteLinks: NavLink[];
export declare const logos: Logo[];
export declare const features: Feature[];
export declare const plans: PricingPlan[];
export declare const testimonials: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
}[];
export declare const faqs: FaqItem[];
export declare const footerColumns: FooterColumn[];
export declare const legalLinks: FooterLink[];
export declare const socialLinks: SocialLink[];
/** Each link is a ready-made filter of the product grid (see ShopStorefront). */
export declare const shopLinks: NavLink[];
export declare const categories: {
    value: string;
    label: string;
}[];
export interface ShopProduct extends Product {
    category: string;
    description: string;
}
export declare const products: ShopProduct[];
export declare const productColors: VariantOption[];
export declare const productSizes: VariantOption[];
export declare const galleryImages: (seed: string, count?: number) => GalleryImage[];
export interface CartItem {
    id: string;
    title: string;
    meta: string;
    price: number;
    quantity: number;
    image: string;
}
export declare const cartItems: () => CartItem[];
/** A pretend discount endpoint: SPRING10 takes 10% off, anything else is rejected. */
export declare function applyCode(code: string): Promise<number>;
/** Shipping rules of the example shop, in euros. */
export declare const FREE_SHIPPING_FROM = 150;
export declare const SHIPPING = 4.9;
export declare const EXPRESS = 9.9;
/** A price as the shop shows it ("€9.90"). */
export declare const money: (amount: number) => string;
/** A pretend network delay for async callbacks in stories. */
export declare const later: (ms?: number) => Promise<void>;
