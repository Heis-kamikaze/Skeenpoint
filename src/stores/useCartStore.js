import { create } from "zustand";
import { toast } from "react-hot-toast";
import axInstance from './../lib/axios.js';



export const useCartStore = create((set, get) => ({
    cart: [],
    total:0,
    subTotal:0,
    

    getCartItems: async ()=> {
        try {
           const res = await axInstance.get('/cart') 
           set({cart: res.data});
           get().calculateTotal();
        } catch (error) {
            set({cart: []})
            toast.error(error?.response?.data?.message || error?.response?.data?.error || "An error occurred")
        }
    },

    addToCart: async (product) => {
        try {
            await axInstance.post(`/cart`, {productId: product._id});
            
            set((state) => {
                const existingItem = state.cart.find((item) => item.productRef === product._id);
                const newCart = existingItem 
                    ? state.cart.map((item) => (item.productRef === product._id ? {...item, quantity: item.quantity + 1} : item)) 
                    : [...state.cart, { productRef: product._id, quantity: 1 }];
    
                return { cart: newCart };
            });
    
            get().calculateTotal();
            get().getCartItems();
            toast.success("Added to cart successfully");
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "An error occurred")
        }
    },

    clearCart: async () => {
		set({ cart: [], total: 0, subtotal: 0 });
	},

    removeFromCart: async (cartId) => {
		await axInstance.delete(`/cart/${cartId}`, { data: { cartId } });
		set((prevState) => ({ cart: prevState.cart.filter((item) => item.cartId !== cartId) }));
		get().calculateTotals();
        get().getCartItems();
	},
    
	updateQuantity: async (cartId, quantity) => {
		// if (quantity === 0) {
		// 	get().removeFromCart(cartId);
		// 	return;
		// }

		await axInstance.put(`/cart/${cartId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === cartId ? { ...item, quantity } : item)),
		}));
		get().calculateTotal();
        get().getCartItems();
	},

    calculateTotal : async () => {
        const {cart} = get();
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        set({total})
    }
}));