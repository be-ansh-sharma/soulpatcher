import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useMetaStore = create(
  persist(
    (set, get) => ({
      user: {},
      darkMode: false,
      setDarkMode: (flag) => {
        set({
          darkMode: flag,
        });
      },
      setUser: (user) => {
        set({
          user,
        });
      },
    }),
    {
      name: 'meta',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMetaStore;
