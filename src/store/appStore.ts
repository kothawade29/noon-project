import { create } from 'zustand';
import { createCatalogSlice } from './slices/catalogSlice';
import { createCartSlice } from './slices/cartSlice';
import type { AppStore } from './types';

export const useAppStore = create<AppStore>()((...args) => ({
  ...createCatalogSlice(...args),
  ...createCartSlice(...args),
}));

export const useStore = useAppStore;
