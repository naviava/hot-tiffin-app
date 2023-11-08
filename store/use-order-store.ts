import { create } from "zustand";
import { OrderType } from "@prisma/client";

type StoreOrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  customerNote?: string;
};

type OrderStore = {
  items: StoreOrderItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  addToOrder: (item: StoreOrderItem) => void;
  removeFromOrder: (id: string) => void;
  clearOrder: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  setCustomerNote: (id: string, note: string) => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  getTotalWithTax: () => number;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  items: [],
  orderType: "DINE_IN",

  setOrderType: (type: OrderType) => set(() => ({ orderType: type })),

  addToOrder: (item: StoreOrderItem) =>
    set((state) => {
      const itemExists = state.items.some(
        (orderItem) => orderItem.id === item.id,
      );
      if (!itemExists) {
        return { items: [...state.items, item] };
      }
      return state;
    }),

  removeFromOrder: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

  clearOrder: () => set(() => ({ items: [] })),

  increaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as StoreOrderItem[]),
    })),

  setCustomerNote: (id, note) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, customerNote: note } : item,
      ),
    })),

  getTotalQuantity: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),

  getTotalWithTax: () => {
    const totalPrice = get().getTotalPrice();
    const tax = totalPrice * 0.18;
    return totalPrice + tax;
  },
}));
