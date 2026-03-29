import type { Product } from '../shared/types/product';

export type CatalogSlice = {
  products: readonly Product[];
  getProductById: (id: string) => Product | undefined;
};

export type CartSlice = {
  cartLineItems: readonly string[];
  cartBadgePulseId: number;
  addToCart: (productId: string) => void;
};

export type AppStore = CatalogSlice & CartSlice;
