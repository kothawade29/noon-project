import { useAppStore } from '../appStore';

export function useCartLineItems(): readonly string[] {
  return useAppStore((s) => s.cartLineItems);
}

export function useAddToCart() {
  return useAppStore((s) => s.addToCart);
}
