import { motion } from "framer-motion";
import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import axInstance from "./../lib/axios.js";


const OrderSum = () => {
  const { total, subTotal, cart, shippingFee } = useCartStore();
  const { user } = useUserStore();
  const FsubTotal = subTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const Ftotal = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const FshippingFee = shippingFee.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const flutterwaveKey = import.meta.env.VITE_FLW_PUBLIC_KEY;
  const clientUrl = import.meta.env.VITE_CLIENT_URL;


  const now = new Date();
  // Flutterwave configuration
  const config = {
    public_key: flutterwaveKey,
    tx_ref: `flw-tx-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${Date.now()}`,
    amount: total, // Total amount from cart
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: user.email,
      phone_number: user.phone,
      name: user.name,
    },
    customizations: {
      title: "Skeenpoint.com",
      description: "Payment for items in cart",
      logo: "https://res.cloudinary.com/dk60nznrm/image/upload/v1726052557/logo_w3xjkz.png", // Optional logo
    },
  };

  // Flutterwave payment handler
  const handlePayment = useFlutterwave(config);

  const handleCheckout = () => {
	toast.loading("Processing checkout")
    handlePayment({
      callback: async (response) => {
        // Handle payment success response
        console.log(response);
        if (response.status === "successful") {
          toast.success("Payment Successful!");

          // Send order details to the backend for order creation
          try {
            const res = await axInstance.post("/payment/create-order", {
              products: cart,
              totalAmount: total,
              flutterwaveTransactionId: response.tx_ref + response.tx_ref + response.flw_ref, // Use the actual transaction ID
            });

            // Handle order creation success
            if (res.data.success) {
              toast.success("Order created successfully!");
              closePaymentModal();
              // You can redirect the user to the order confirmation page here
            }
          } catch (error) {
            console.error("Error creating order:", error);
            toast.error("An error occurred while creating the order");
          }
        } else {
          toast.error("Payment Failed or Cancelled");
        }
      },
      onClose: () => {
        console.log("Payment modal closed");
        toast.error("Payment process was interrupted.");
      },
    });
  };

  return (
    <motion.div
      className={`space-y-4 rounded-lg p-4 shadow-slate-400 shadow-2xl sm:p-6 fixed z-50 bg-white bottom-10 w-full`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold">Cart Total</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4 border-gray-600 pt-2">
            <dt className="text-base font-bold">SubTotal</dt>
            <dd className="text-base font-bold text-b1-100">
              &#x20a6;{FsubTotal}
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4 border-gray-600 pt-2">
            <dt className="text-base font-bold">Shipping Fee</dt>
            <dd className="text-base text-right font-bold text-b1-100">
              {/* Shipping options will be updated during checkout */}
              &#x20a6;{FshippingFee}
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4 border-gray-600 pt-2">
            <dt className="text-base font-bold">Total</dt>
            <dd className="text-base font-bold text-b1-100">
              &#x20a6;{Ftotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-rust-100 hover:bg-rust-200 px-5 py-2.5 text-sm font-medium text-white shadow-slate-400 shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-b1-200 underline hover:text-b1-100 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSum;
