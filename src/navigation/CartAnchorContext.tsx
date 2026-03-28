import { createContext, useContext, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import type { View } from 'react-native';

type CartAnchorContextValue = {
  cartAnchorRef: RefObject<View | null>;
};

const CartAnchorContext = createContext<CartAnchorContextValue | null>(null);

export function CartAnchorProvider({ children }: { children: ReactNode }) {
  const cartAnchorRef = useRef<View | null>(null);
  const value = useMemo(() => ({ cartAnchorRef }), []);
  return <CartAnchorContext.Provider value={value}>{children}</CartAnchorContext.Provider>;
}

export function useCartAnchor(): CartAnchorContextValue {
  const ctx = useContext(CartAnchorContext);
  if (!ctx) {
    throw new Error('useCartAnchor must be used within CartAnchorProvider');
  }
  return ctx;
}
