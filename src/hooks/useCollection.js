import { useState, useCallback } from 'react';

const KEY = 'wine_cellar_v2';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); }
  catch { return []; }
}

function persist(collection) {
  localStorage.setItem(KEY, JSON.stringify(collection));
}

export function useCollection() {
  const [collection, setCollection] = useState(load);

  const addBottle = useCallback((data) => {
    const bottle = {
      id: `b_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      addedAt: new Date().toISOString(),
      ...data,
    };
    setCollection(prev => {
      const next = [bottle, ...prev];
      persist(next);
      return next;
    });
    return bottle;
  }, []);

  const removeBottle = useCallback((id) => {
    setCollection(prev => {
      const next = prev.filter(b => b.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return { collection, addBottle, removeBottle };
}
