import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/Product";

interface FavoritesContextData {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData
);

const LOCAL_STORAGE_KEY = "my-store-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFavorites) {
      return JSON.parse(storedFavorites);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    const isFavorited = favorites.some((fav) => fav.id === product.id);

    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  return context;
}
