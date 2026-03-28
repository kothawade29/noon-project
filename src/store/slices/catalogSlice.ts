import type { StateCreator } from 'zustand';
import { mockProducts } from '../../shared/data/mockProducts';
import type { AppStore, CatalogSlice } from '../types';

export const createCatalogSlice: StateCreator<AppStore, [], [], CatalogSlice> = (_set, get) => ({
  products: mockProducts,
  getProductById: (id) => get().products.find((p) => p.id === id),
});
