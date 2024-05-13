import { create } from 'zustand';

const useDataState = create((set, get) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
