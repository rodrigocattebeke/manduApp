import { useEffect, useState } from "react";

export const useRecentSearches = (uuid) => {
  const key = `recentSearches_${uuid}`;
  const [recent, setRecent] = useState("");

  useEffect(() => {
    if (uuid) {
      const stored = JSON.parse(localStorage.getItem(key)) || [];
      setRecent(stored);
    }
  }, [uuid, key]);

  const addSearch = (search) => {
    if (!uuid || !search) return;

    const updated = [search, ...recent.filter((item) => item !== search)].slice(0, 1);
    localStorage.setItem(key, JSON.stringify(updated));
    setRecent(updated);
  };

  return { recent, addSearch };
};
