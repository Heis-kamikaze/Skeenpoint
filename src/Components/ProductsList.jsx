import React from 'react';
import { useProductStore } from '../stores/useProductStore';
import { motion } from 'framer-motion';
import { Trash, Star } from 'lucide-react';
import { BsStarFill } from 'react-icons/bs';
import MiniLoader from './MiniLoader';
import toast from 'react-hot-toast';

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, product, loading } = useProductStore();

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4 bg-b1-200 p-4 rounded-lg shadow-lg">
        {/* Header */}
        <div className="col-span-3 text-left text-xs font-medium text-b1-100 uppercase">Product</div>
        <div className="col-span-2 text-left text-xs font-medium text-b1-100 uppercase">Price</div>
        <div className="col-span-3 text-left text-xs font-medium text-b1-100 uppercase">Category</div>
        <div className="col-span-2 text-left text-xs font-medium text-b1-100 uppercase">Featured</div>
        <div className="col-span-2 text-right text-xs font-medium text-b1-100 uppercase">Actions</div>

        {/* Products */}
        {product && product.map((prod) => (
          <motion.div
            key={prod._id}
            className='col-span-12 grid grid-cols-12 gap-4 items-center border-b py-2'
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Product Name and Image */}
              <div className="text-xs text-left col-span-12 font-medium text-gray-900 mb-1">{prod.name}</div>
            <div className="col-span-3 flex flex-col">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full mr-2" src={prod.image} alt={prod.name} />
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-xs text-gray-900">&#x20a6;{prod.price}</div>

            {/* Category */}
            <div className="col-span-3 text-xs text-gray-900">{prod.category}</div>

            {/* Featured */}
            <div className="col-span-2">
              <button onClick={() => {
                try {
                  
                  toggleFeaturedProduct(prod._id)
                } catch (error) {
                  toast.error(error.response.data.message || "An unexpected error occurred");
                }
                }} className={`focus:outline-none ${loading ? "disabled" : ""}`}>
                {loading ? <MiniLoader /> : (
                  prod.isFeatured 
                    ? <BsStarFill className="w-6 h-6 text-yellow-400" />
                    : <Star className="w-6 h-6 text-rust-200" />
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="col-span-2">
              <button onClick={() => deleteProduct(prod._id)} className={`focus:outline-none ${loading ? "disabled" : ""}`}>
                {loading ? <MiniLoader /> : <Trash className="w-6 h-6 text-rust-200" />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
