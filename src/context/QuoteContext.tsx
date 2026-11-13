import React, { createContext, useContext, useEffect, useState } from 'react';
import { PRODUCTS, ProductItem } from '../data/products';

export interface QuoteListItem {
  code: string;
  quantity: number;
  note: string;
}

export interface DetailedQuoteItem extends QuoteListItem {
  product: ProductItem;
}

interface QuoteContextValue {
  items: QuoteListItem[];
  detailedItems: DetailedQuoteItem[];
  totalDistinctItems: number;
  totalVolumes: number;
  lastFeedback: string | null;
  addItem: (code: string, quantity?: number, note?: string) => void;
  updateQuantity: (code: string, quantity: number) => void;
  updateNote: (code: string, note: string) => void;
  removeItem: (code: string) => void;
  clearList: () => void;
  getItemQuantity: (code: string) => number;
  dismissFeedback: () => void;
}

const STORAGE_KEY = 'vertice_quote_items_v1';

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteListItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (entry): entry is QuoteListItem =>
          typeof entry?.code === 'string' &&
          typeof entry?.quantity === 'number' &&
          entry.quantity >= 1 &&
          PRODUCTS.some((p) => p.code === entry.code)
      );
    } catch {
      return [];
    }
  });

  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignora falha de armazenamento privado sem interromper a navegação
    }
  }, [items]);

  useEffect(() => {
    if (!lastFeedback) return;
    const timer = window.setTimeout(() => {
      setLastFeedback(null);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [lastFeedback]);

  const addItem = (code: string, quantity = 1, note = '') => {
    const safeQty = Math.max(1, Math.floor(quantity));
    const product = PRODUCTS.find((p) => p.code === code);
    if (!product) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.code === code);
      if (existing) {
        return prev.map((i) =>
          i.code === code
            ? {
                ...i,
                quantity: i.quantity + safeQty,
                note: note.trim() ? note.trim() : i.note,
              }
            : i
        );
      }
      return [...prev, { code, quantity: safeQty, note: note.trim() }];
    });

    setLastFeedback(`${product.name} adicionado à lista de orçamento`);
  };

  const updateQuantity = (code: string, quantity: number) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    setItems((prev) => prev.map((i) => (i.code === code ? { ...i, quantity: safeQty } : i)));
  };

  const updateNote = (code: string, note: string) => {
    setItems((prev) => prev.map((i) => (i.code === code ? { ...i, note } : i)));
  };

  const removeItem = (code: string) => {
    const product = PRODUCTS.find((p) => p.code === code);
    setItems((prev) => prev.filter((i) => i.code !== code));
    if (product) {
      setLastFeedback(`${product.name} removido da lista de orçamento`);
    }
  };

  const clearList = () => {
    setItems([]);
    setLastFeedback('Lista de orçamento limpa');
  };

  const getItemQuantity = (code: string): number => {
    return items.find((i) => i.code === code)?.quantity ?? 0;
  };

  const detailedItems: DetailedQuoteItem[] = items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.code === item.code);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((entry): entry is DetailedQuoteItem => entry !== null);

  const totalDistinctItems = detailedItems.length;
  const totalVolumes = detailedItems.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <QuoteContext.Provider
      value={{
        items,
        detailedItems,
        totalDistinctItems,
        totalVolumes,
        lastFeedback,
        addItem,
        updateQuantity,
        updateNote,
        removeItem,
        clearList,
        getItemQuantity,
        dismissFeedback: () => setLastFeedback(null),
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextValue => {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error('useQuote deve ser utilizado dentro de QuoteProvider');
  }
  return ctx;
};

