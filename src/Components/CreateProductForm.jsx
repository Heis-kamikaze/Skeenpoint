import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader, Plus, Upload } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from 'framer-motion';

const CreateProductForm = () => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if(file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setProductData({ ...productData, image: reader.result });
        };

        reader.readAsDataURL(file);
    }
  };

  const categories = ["Facial", "Body", "Facial + Body"];
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: "",
    ingredients: "",
    usage: "",
    price: "",
    category: [""],
  });

  const { loading, createProduct } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(productData);
      setProductData({
        name: "",
        description: "",
        image: "",
        ingredients: "",
        usage: "",
        price: "",
        category: "",
      });
    } catch (error) {
      toast.error(error.response.data.error || error.response.data.message || "An unexpected error occurred");

    }
  };


  return (
    <motion.div
    className='bg-white shadow-slate-400 shadow-xl rounded-lg flex justify-between items-center mb-4'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-slate-400 shadow-md rounded px-8 pb-8 text-start"
      >
        <div className="">
          <label htmlFor="name" className="text-sm font-medium text-rust-200">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            required
            className="text-sm font-extralight mt-1 block w-full bg-b1-200 border border-b1-100 rounded-md shadow-slate-400 shadow-xl py-0.5 px-1 text-focus:outline-none focus:ring-b1-100 focus:border-b1-100"
          />
        </div>

        <div className="">
          <label
            htmlFor="description"
            className="text-sm font-medium text-rust-200"
          >
            Product Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            required
            className="text-sm font-extralight mt-1 block w-full bg-b1-200 border border-b1-100 rounded-md shadow-slate-400 shadow-xl py-0.5 px-1 text-focus:outline-none focus:ring-b1-100 focus:border-b1-100"
          />
        </div>

        <div className="">
          <label
            htmlFor="ingredients"
            className="text-sm font-medium text-rust-200"
          >
            Ingredients
          </label>
          <textarea
            type="text"
            id="ingredients"
            name="ingredients"
            value={productData.ingredients}
            onChange={(e) =>
              setProductData({ ...productData, ingredients: e.target.value })
            }
            required
            className="text-sm font-extralight mt-1 block w-full bg-b1-200 border border-b1-100 rounded-md shadow-slate-400 shadow-xl py-0.5 px-1 text-focus:outline-none focus:ring-b1-100 focus:border-b1-100"
          />
        </div>

        <div className="">
          <label
            htmlFor="category"
            className="text-sm font-medium text-rust-200"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            className="text-sm font-extralight mt-1 block w-full bg-b1-200 border border-b1-100 rounded-md shadow-slate-400 shadow-xl py-0.5 px-1 text-focus:outline-none focus:ring-b1-100 focus:border-b1-100"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label htmlFor="usage" className="text-sm font-medium text-rust-200">
            Usage
          </label>
          <textarea
            type="text"
            id="usage"
            name="usage"
            value={productData.usage}
            onChange={(e) =>
              setProductData({ ...productData, usage: e.target.value })
            }
            required
            className="text-sm font-extralight mt-1 block w-full bg-b1-200 border border-b1-100 rounded-md shadow-slate-400 shadow-xl py-0.5 px-1 text-focus:outline-none focus:ring-b1-100 focus:border-b1-100"
          />
        </div>

        <div className="">
          <label htmlFor="price" className="text-sm font-medium text-rust-200">
            Price in &#x20a6;
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
            required
            className="text-sm font-extralight mt-1 block w-full bg-b1-200 border border-b1-100 rounded-md shadow-slate-400 shadow-xl py-0.5 px-1 text-focus:outline-none focus:ring-b1-100 focus:border-b1-100"
          />
        </div>
        <div className="mt-5 mb-7 flex items-center justify-between align-middle">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-rust-100 py-1 px-2 text-sm font-extralight border border-rust-100 shadow-slate-400 shadow-xl rounded-md"
          >
            <Upload className="w-fit h-fit inline-block" />
            Upload Image
          </label>
          <span>
          {productData.image && (
            <span className="ml-1 text-sm text-b1-100">
              Image Uploaded
            </span>
          )}
          </span>
        </div>

        <button
          type="submit"
          className="w-full mt-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-slate-400 shadow-xl text-sm font-medium text-white bg-rust-100 hover:bg-rust-200 transition duration-150 ease-in-out disabled:opacity-50"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 text-white" />
            </>
          ) : (
            <span className="flex items-center">
              <span>Create</span>
              <Plus className="h-5 w-5 ml-2" />
            </span>
          )}
        </button>
      </form>
    </div>
    </motion.div>
  );
};

export default CreateProductForm;
