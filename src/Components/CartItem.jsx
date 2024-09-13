import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = (item) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="flex justify-evenly items-center">
      <img src={item.product.image} alt="" className="w-16" />
      <p className=" text-sm">{item.product.name}</p>
      <p className=" text-sm">&#x20a6;{item.product.price}</p>
      <label className="sr-only">Choose quantity:</label>
      <div className="flex items-center justify-between">
        <button
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-md border border-rust-100 bg-rust-100 hover:bg-rust-200 focus:outline-none focus:ring-2"
          onClick={() => updateQuantity(item.product.cartId, item.product.quantity - 1)}
        >
          <Minus className="text-gray-300" />
        </button>
        <p className="px-2 text-sm">{item.product.quantity}</p>
        <button
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-md border border-rust-100 bg-rust-100 hover:bg-rust-200 focus:outline-none focus:ring-2"
          onClick={() => updateQuantity(item.product.cartId, item.product.quantity + 1)}
        >
          <Plus className="text-gray-300" />
        </button>
      </div>
      <p className="text-sm">&#x20a6;{item.product.price * item.product.quantity}</p>
    </div>
  
);
};

export default CartItem;
