import type { StateCreator } from 'zustand';
import type { AppStore, CartSlice } from '../types';

export const createCartSlice: StateCreator<AppStore, [], [], CartSlice> = (set) => ({
  cartLineItems: [],
  addToCart: (productId) =>
    set((s) => ({
      cartLineItems: [...s.cartLineItems, productId],
    })),
});
