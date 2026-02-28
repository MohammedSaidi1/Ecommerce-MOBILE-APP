import { CartItem, Product } from '@/types';
import { create } from 'zustand';

interface CartState {
    items: CartItem[];
    addItem: (product: Product, size: string, color: string) => void;
    removeItem: (productId: string, size: string, color: string) => void;
    updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    total: 0,
    addItem: (product, size, color) => {
        const { items } = get();
        const existingItem = items.find(
            (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );

        if (existingItem) {
            set({
                items: items.map((item) =>
                    item.id === product.id && item.selectedSize === size && item.selectedColor === color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
                total: get().total + product.price,
            });
        } else {
            set({
                items: [...items, { ...product, selectedSize: size, selectedColor: color, quantity: 1 }],
                total: get().total + product.price,
            });
        }
    },
    removeItem: (productId, size, color) => {
        const { items } = get();
        const itemToRemove = items.find(
            (item) => item.id === productId && item.selectedSize === size && item.selectedColor === color
        );
        if (!itemToRemove) return;

        set({
            items: items.filter(
                (item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
            ),
            total: get().total - (itemToRemove.price * itemToRemove.quantity),
        });
    },
    updateQuantity: (productId, size, color, quantity) => {
        const { items } = get();
        const currentItem = items.find(
            (item) => item.id === productId && item.selectedSize === size && item.selectedColor === color
        );
        if (!currentItem) return;

        const diff = quantity - currentItem.quantity;

        if (quantity <= 0) {
            get().removeItem(productId, size, color);
            return;
        }

        set({
            items: items.map((item) =>
                item.id === productId && item.selectedSize === size && item.selectedColor === color
                    ? { ...item, quantity }
                    : item
            ),
            total: get().total + (currentItem.price * diff),
        });
    },
    clearCart: () => set({ items: [], total: 0 }),
}));
