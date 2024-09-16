import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = (item) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="px-2 py-1 font-bold bg-gradient-to-b from-white to-b1-200 rounded-b-xl">
      <div className="flex justify-between items-center">
      <p className="text-sm">{item.product.name}</p>
      
      </div>
      <div className="flex justify-evenly items-center h-14">
        <img src={item.product.image} alt="item" className="w-8" />
        <p className=" text-sm">&#x20a6;{item.product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        <label className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between border rounded-md">
          <button
            className="inline-flex h-6 w-5 shrink-0 items-center justify-center p-1 rounded-l-md border border-rust-100 bg-rust-100 hover:bg-rust-200 focus:outline-none focus:ring-2"
            onClick={() => updateQuantity(item.product.cartId, item.product.quantity - 1)}
          >
            <Minus className="text-gray-300" />
          </button>
          <p className="px-1.5 text-sm">{item.product.quantity}</p>
          <button
            className="inline-flex h-6 w-5 shrink-0 items-center justify-center p-1 rounded-r-md border border-rust-100 bg-rust-100 hover:bg-rust-200 focus:outline-none focus:ring-2"
            onClick={() => updateQuantity(item.product.cartId, item.product.quantity + 1)}
          >
            <Plus className="text-gray-300" />
          </button>
        </div>
        <p className="text-sm">&#x20a6;{(item.product.price * item.product.quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      </div>
      <hr className="mx-16 bg-slate-400"/>
    </div>
  
);
};

export default CartItem;
