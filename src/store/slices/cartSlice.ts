import type { StateCreator } from 'zustand';
import type { AppStore, CartSlice } from '../types';

export const createCartSlice: StateCreator<AppStore, [], [], CartSlice> = (set) => ({
  cartLineItems: [],
  cartBadgePulseId: 0,
  addToCart: (productId) =>
    set((s) => ({
      cartLineItems: [...s.cartLineItems, productId],
      cartBadgePulseId: s.cartBadgePulseId + 1,
    })),
});
