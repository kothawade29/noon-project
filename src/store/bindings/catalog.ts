import type { Product } from '../../shared/types/product';
import { useAppStore } from '../appStore';

export function useCatalogProducts(): readonly Product[] {
  return useAppStore((s) => s.products);
}

export function useCatalogProductById(productId: string): Product | undefined {
  return useAppStore((s) => s.getProductById(productId));
}
