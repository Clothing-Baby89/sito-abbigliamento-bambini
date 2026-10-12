import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  size: string;
  color: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  ready: boolean;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (item: Omit<CartItem, "qty">, qty: number) => void;
  remove: (item: Omit<CartItem, "qty">) => void;
  clear: () => void;
};

const memoryStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

function same(a: Omit<CartItem, "qty">, b: Omit<CartItem, "qty">) {
  return a.slug === b.slug && a.size === b.size && a.color === b.color;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      ready: false,
      setOpen: (open) => set({ open }),
      add: (item, qty = 1) => {
        const items = get().items;
        const index = items.findIndex((entry) => same(entry, item));
        const nextQty = Math.max(1, Math.min(8, qty));
        if (index >= 0) {
          const next = items.slice();
          const current = next[index];
          if (!current) return;
          next[index] = {
            ...current,
            qty: Math.min(8, current.qty + nextQty),
          };
          set({ items: next, open: true });
          return;
        }
        set({ items: [...items, { ...item, qty: nextQty }], open: true });
      },
      setQty: (item, qty) => {
        const nextQty = Math.max(0, Math.min(8, qty));
        const items =
          nextQty === 0
            ? get().items.filter((entry) => !same(entry, item))
            : get().items.map((entry) =>
                same(entry, item) ? { ...entry, qty: nextQty } : entry,
              );
        set({ items });
      },
      remove: (item) =>
        set({ items: get().items.filter((entry) => !same(entry, item)) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "nido-lino-cart",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : window.localStorage,
      ),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function useCartCount() {
  return useCart((state) =>
    state.items.reduce((sum, item) => sum + item.qty, 0),
  );
}
