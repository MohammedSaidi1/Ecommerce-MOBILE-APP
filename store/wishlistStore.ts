import { Product } from '@/types';
import { create } from 'zustand';

interface WishlistState {
    items: Product[];
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
    items: [],
    toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.find((item) => item.id === product.id);

        if (exists) {
            set({ items: items.filter((item) => item.id !== product.id) });
        } else {
            set({ items: [...items, product] });
        }
    },
    isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
    },
}));
