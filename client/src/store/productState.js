import { create } from 'zustand';

const useProductState = create((set, get) => ({
  productId: null,
  setProductId: (productId) => set({ productId }),
}));

const getProductState = () => useProductState.getState();
export { useProductState, getProductState };
