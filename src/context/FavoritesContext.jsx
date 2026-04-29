import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "rm:favorites:v1";

function safeParse(json, fallback) {
  try {
    const data = JSON.parse(json);
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? safeParse(raw, []) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id) {
    return favorites.some((c) => String(c.id) === String(id));
  }

  function addFavorite(character) {
    setFavorites((prev) => {
      if (prev.some((c) => String(c.id) === String(character.id))) return prev;
      return [character, ...prev];
    });
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((c) => String(c.id) !== String(id)));
  }

  function clearFavorites() {
    setFavorites([]);
  }

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      favoritesCount: favorites.length,
    }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside <FavoritesProvider>");
  }
  return ctx;
}