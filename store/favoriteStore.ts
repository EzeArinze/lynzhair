import { create } from "zustand";

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
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
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
}));
