export interface GalleryImage {
    src: string;
    alt: string;
    /** A smaller version for the thumbnail strip. */
    thumb?: string | undefined;
}
interface Props {
    images: GalleryImage[];
    /** Index of the shown image. */
    index?: number;
    /** Width / height of the main image. */
    aspect?: string;
    /** Thumbnails below or (wide screens) along the left side. */
    thumbs?: 'below' | 'side' | 'none';
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    showLabel?: (index: number, total: number) => string;
    onchange?: ((index: number) => void) | undefined;
}
declare const ProductGallery: import("svelte").Component<Props, {}, "index">;
type ProductGallery = ReturnType<typeof ProductGallery>;
export default ProductGallery;
