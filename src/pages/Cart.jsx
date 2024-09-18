import { ShoppingCart } from "lucide-react";
import ProductCard from "../Components/ProductCard";
import { useCartStore } from "../stores/useCartStore";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import { useUserStore } from "../stores/useUserStore";
import { useEffect, useState } from "react";
import OrderSum from "./../Components/OrderSum";

const Cart = () => {
  const { cart, getCartItems } = useCartStore();
  const { user } = useUserStore();
  const [sumOpen, setSumOpen] = useState(false);

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-12 sm:pt-16 md:pt-24 mb-96"
    >
      {cart && cart.length > 0 ? (
        <div>
          <div className="flex justify-between mx-4 my-2">
            <p className="m-4 text-2xl text-rust-100 font-extrabold">
              Your Cart
            </p>
            <button onClick={() => setSumOpen(!sumOpen)}>{sumOpen ? 'Close Summary' : 'Open Summary'}</button>
          </div>
          <div className="flex-col items-center justify-center w-screen ml-2">
            <div className="grid grid-cols-4 text-rust-100">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>
          </div>
          <div className="">
            {cart.map((item) => (
              <CartItem key={item._id} product={item} />
            ))}
          </div>
          <AnimatePresence>{sumOpen && <OrderSum />}</AnimatePresence>
        </div>
      ) : (
        <>
          <EmptyCartUI />
        </>
      )}
    </motion.div>
  );
};

export default Cart;

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-b1-200" />
    <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
    <p className="text-b1-200">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-rust-100 px-6 py-2 text-white transition-colors hover:bg-rust-200"
      to="/shop"
    >
      Start Shopping
    </Link>
  </motion.div>
);
