import { motion } from 'framer-motion'
import React from 'react'
import { useCartStore } from '../stores/useCartStore'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import axInstance from '../lib/axios'
import toast from 'react-hot-toast'

const OrderSum = () => {

  const {total, subTotal, cart} = useCartStore()
  const FsubTotal = subTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const handlePayment = async () => {
	console.log('Payment processing')
	try {
		
		// Make a request to create the checkout session
		const res = await axInstance.post("/payment/create-checkout-session", { products : cart });
	
		// Get the checkout URL from the response
		const { checkoutUrl } = res.data;

		window.location.href = checkoutUrl;
	  } catch (error) {
		console.error("Error initiating payment:", error);
		toast.error(error.response.data.error || "An error occured during checkout")
	  }
  }

  return (
    <motion.div
			className={`space-y-4 rounded-lg px-4 pb-4 shadow-slate-400 shadow-2xl sm:p-6 fixed z-50 bg-white bottom-10`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold'>Cart Total</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4 border-gray-600 pt-2'>
						<dt className='text-base font-bold'>SubTotal</dt>
						<dd className='text-base font-bold text-b1-100'>&#x20a6;{FsubTotal}</dd>
					</dl>
					<dl className='flex items-center justify-between gap-4 border-gray-600 pt-2'>
						<dt className='text-base font-bold'>Shipping Fee</dt>
						<dd className='text-base text-right font-bold text-b1-100'>Shipping options will be updated during checkout</dd>
					</dl>
					<dl className='flex items-center justify-between gap-4 border-gray-600 pt-2'>
						<dt className='text-base font-bold'>Total</dt>
						<dd className='text-base font-bold text-b1-100'>&#x20a6;{FsubTotal}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-rust-100 hover:bg-rust-200 px-5 py-2.5 text-sm font-medium text-white shadow-slate-400 shadow-xl'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePayment}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/shop'
						className='inline-flex items-center gap-1 text-sm font-medium text-b1-200 underline hover:text-b1-100 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
  )
}

export default OrderSum