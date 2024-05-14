import { create } from 'zustand';

const useProductState = create((set, get) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));

const getProductState = () => useProductState.getState();
export { useProductState, getProductState };
