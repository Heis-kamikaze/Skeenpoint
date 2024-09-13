import React from 'react'
import { useProductStore } from '../stores/useProductStore'
import { motion } from 'framer-motion'
import { Trash, Star, StarIcon } from 'lucide-react'
import { BsStarFill } from 'react-icons/bs'
import MiniLoader from './MiniLoader'

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, product, loading } = useProductStore()
  return (
    <div>
      
        <motion.div
          className='bg-b1-200 shadow-md rounded-lg flex justify-center items-center mb-4'
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="divide-y divide-rust-100">
            <thead>
              <tr>
                <th className="px-1 py-1 text-left text-xs font-medium text-b1-100 uppercase tracking-wider">Product</th>
                <th className="px-1 py-1 text-left text-xs font-medium text-b1-100 uppercase tracking-wider">Price</th>
                <th className="px-1 py-1 text-left text-xs font-medium text-b1-100 uppercase tracking-wider">Category</th>
                <th className="px-1 py-1 text-left text-xs font-medium text-b1-100 uppercase tracking-wider">Featured</th>
                <th className="px-1 py-1 text-left text-xs font-medium text-b1-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product && product.map((prod) => (
                <tr 
                key={prod._id}
                style={{
                  borderBottom: prod !== product[product.length - 1] ? '1px solid #ddd' : 'none',
                }}
                >
                  <td className="px-1 py-1 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={prod.image} alt="" />
                      </div>
                        <div className="text-sm font-medium text-gray-900 w-8 text-wrap">{prod.name}</div>
                    </div>
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{prod.price}</div>
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{prod.category}</div>
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap">
                    <div className={`text-sm rounded-full  text-gray-900`}>
                      <button onClick={() => toggleFeaturedProduct(prod._id)}>
                        {loading ? <MiniLoader /> : prod.isFeatured ? <BsStarFill className="w-6 h-6 text-yellow-400" /> : <Star className="w-6 h-6 text-rust-200" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => deleteProduct(prod._id)}>
                      {loading ? <MiniLoader /> : <Trash className="w-6 h-6 text-rust-200" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
    </div>
  )
}

export default ProductsList