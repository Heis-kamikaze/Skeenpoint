import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import CreateProductForm from '../Components/CreateProductForm';
import ProductsList from '../Components/ProductsList';
import AnalyticsTab from '../Components/AnalyticsTab';
import { useProductStore } from '../stores/useProductStore';

const tabs = [
  {id: "create", label: "Create Product", icon: <PlusCircle className="w-6 h-6 md:w-10 md:h-10" />},
  {id: "manage", label: "Manage Products", icon: <ShoppingBasket className="w-6 h-6 md:w-10 md:h-10" />},
  {id: "analytics", label: "Analytics", icon: <BarChart className="w-6 h-6 md:w-10 md:h-10" />},
]

const AdminBoard = () => {

  const [activeTab, setActiveTab] = React.useState("create");
  const {fetchProducts} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="relative z-10 py-16">
        <motion.h1
          className='text-3xl md:text-5xl font-bold text-center flex flex-col justify-center'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            Admin Dashboard
            <motion.div
              className="flex justify-center gap-4 mt-8 mx-3"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {tabs.map((tab) => (
                <motion.div
                  key={tab.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer shadow-xl ${activeTab === tab.id ? 'bg-rust-100 text-white shadow-lg shadow-slate-950' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5
                   }}
                >
                  {tab.icon}
                  <span className='text-sm'>{tab.label}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="mt-4 px-1"
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.4, delay: 0.5 }}
            >
              {activeTab === "create" && <CreateProductForm />}
              {activeTab === "manage" && <ProductsList />}
              {activeTab === "analytics" && <AnalyticsTab />}
            </motion.div>
        </motion.h1>
      </div>
    </div>
  )
}

export default AdminBoard
