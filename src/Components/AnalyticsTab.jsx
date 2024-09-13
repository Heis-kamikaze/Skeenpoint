import { motion } from 'framer-motion'
import React from 'react'

const AnalyticsTab = () => {
  return (
    <motion.div
      className='bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4'
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Analytics</h1>
    </motion.div>
  )
}

export default AnalyticsTab