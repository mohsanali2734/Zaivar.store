/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { byId, CONFIG } from "@/lib/products";

type Cart = Record<string, number>;

interface StoreValue {
  cart: Cart;
  wish: string[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string, n?: number, openDrawer?: boolean) => void;
  change: (id: string, delta: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
}

const Ctx = createContext<StoreValue | null>(null);
const KEY = "zaivar-store-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [wish, setWish] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw) as { cart?: Cart; wish?: string[] };
        const clean: Cart = {};
        Object.entries(d.cart ?? {}).forEach(([id, q]) => {
          if (byId(id) && q > 0) clean[id] = q;
        });
        setCart(clean);
        setWish((d.wish ?? []).filter((id) => byId(id)));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ cart, wish }));
    } catch {}
  }, [cart, wish, ready]);

  const add = useCallback((id: string, n = 1, openDrawer = true) => {
    const p = byId(id);
    if (!p || p.stock <= 0) return;
    setCart((c) => ({ ...c, [id]: Math.min(p.stock, (c[id] ?? 0) + n) }));
    if (openDrawer) setOpen(true);
  }, []);

  const change = useCallback((id: string, delta: number) => {
    const p = byId(id);
    if (!p) return;
    setCart((c) => {
      const next = Math.min(p.stock, (c[id] ?? 0) + delta);
      const { [id]: _, ...rest } = c;
      return next > 0 ? { ...rest, [id]: next } : rest;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart((c) => {
      const { [id]: _, ...rest } = c;
      return rest;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);
  const toggleWish = useCallback(
    (id: string) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    [],
  );

  const value = useMemo<StoreValue>(() => {
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    const subtotal = Object.entries(cart).reduce((s, [id, q]) => s + (byId(id)?.price ?? 0) * q, 0);
    const shipping = count === 0 || subtotal >= CONFIG.freeShipping ? 0 : CONFIG.shippingFee;
    return { cart, wish, count, subtotal, shipping, total: subtotal + shipping, open, setOpen, add, change, remove, clear, toggleWish };
  }, [cart, wish, open, add, change, remove, clear, toggleWish]);

  return createElement(Ctx.Provider, { value }, children);
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside <StoreProvider>");
  return v;
}