import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "./../stores/useProductStore";
import LoadingSpinner from "./../Components/LoadingSpinner";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { user } = useUserStore();
  const { id } = useParams();
  const { product, findProductById, loading } = useProductStore();
  const { cart, addToCart } = useCartStore();

  useEffect(() => {
    // Fetch product details by ID when component mounts
    findProductById(id);
  }, [id, findProductById]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    addToCart(product); // Use product directly from the store
  };


  if (loading) return <LoadingSpinner />;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="pt-12 sm:pt-16 md:pt-24 mx-3 mb-20">
      <div className="sm:flex flex flex-col justify-center items-center">
        <div className="flex items-center">
          <div className="rounded-lg border border-b1-100 shadow-md mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-fit h-fit"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center">
            <p className="text-xl font-extrabold pb-1">
              {product.name}
            </p>
            <button
              className="bg-rust-100 text-white text-xs md:text-xl text-center font-light px-4 py-2 rounded-md md:rounded-lg mt-2 md:w-fit sm:w-fit"
              onClick={handleAddToCart}
            >
              Add to Cart <ShoppingCart className="inline-block" />
            </button>
          </div>

          <p className="text-md font-extrabold text-rust-100">
            &#x20a6;{product.price}
          </p>
          <p className="font-medium">{product.description}</p>
          <hr />
          <span className=""><span className="font-bold text-rust-100">Category: </span> {product.category}</span>
        </div>
      </div>
      <div>
        <br />
        <span className="text-rust-100 font-bold">How to Use</span>
        <p>{product.usage}</p>
        <br />

        <span className="text-rust-100 font-bold">Caution</span>
        <p>For External Use Only</p>
        <br />

        <span className="text-rust-100 font-bold">
          Shipping and Delivery
        </span>
        <p>
          The shipping cost is calculated based on the location you choose
          at the point of checking out. We offer last-mile delivery to all
          countries of the world. Our shipping service is highly dependable
          and fast.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
