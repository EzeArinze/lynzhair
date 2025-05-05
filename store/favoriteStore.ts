import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type FavoriteItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type FavoriteStore = {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  getFavorites: () => FavoriteItem[];
};

export const useFavoriteStore = create<FavoriteStore>()(
  devtools(
    persist(
      (set, get) => ({
        favorites: [],
        addToFavorites: (item) =>
          set((state) => ({
            favorites: [...state.favorites, item],
          })),
        removeFromFavorites: (id) =>
          set((state) => ({
            favorites: state.favorites.filter((item) => item.id !== id),
          })),
        isFavorite: (id) => {
          const { favorites } = get();
          return favorites.some((item) => item.id === id);
        },
        clearFavorites: () =>
          set(() => ({
            favorites: [],
          })),
        getFavorites: () => {
          const { favorites } = get();
          return favorites;
        },
      }),
      {
        name: "favorite-storage",
      }
    )
  )
);
