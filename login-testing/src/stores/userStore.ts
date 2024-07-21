import { create } from 'zustand';

type UserStore = {
  authenticated: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  authenticated: false,
  username: '',
  login: (username) => set({ authenticated: true, username }),
  logout: () => set({ authenticated: false, username: '' }),
}));
