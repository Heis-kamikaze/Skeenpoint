import { create } from "zustand";
import axInstance from "../lib/axios.js";
import { toast } from "react-hot-toast";   


export const useProductStore = create((set, get) => ({
    product: [],
    selected:null,
    loading: false,

    setProducts: (products) => set({product: products}),

    createProduct: async (product) => {
        set({loading: true});

        try {
            const res = await axInstance.post("/products", product);
            set((prevState) => ({
                product: [...prevState.product, res.data.product],
                loading: false
            }));
            toast.success(res.data.message);
        } catch (error) {
            set({loading: false});
            toast.error(error.response.data.error || error.response.data.message || "An unexpected error occurred");
        }
    },

    fetchProducts: async () => {
        set({loading: true});

        try {
            const res = await axInstance.get("/products");
            set({product: res.data.products, loading: false});
        } catch (error) {
            set({loading: false});
            toast.error(error?.res?.data?.error || error?.res?.data?.message || "An unexpected error occurred");
        }
    },

    deleteProduct: async (id) => {
        set({loading: true});

        try {
            const res = await axInstance.delete(`/products/${id}`);
            set((prevState) => ({
                product: prevState.product.filter((prod) => prod._id !== id),
                loading: false
            }));
            toast.success(res.data.message);
        } catch (error) {
            set({loading: false});
            toast.error(error?.res?.data?.error || error?.res?.data?.message || "An unexpected error occurred");
        }
    },

    toggleFeaturedProduct: async (id) => {
        set({loading: true});

        try {
            const res = await axInstance.patch(`/products/${id}`);
            set((prevState) => ({
                product: prevState.product.map((prod) => 
                    prod._id === id ? {...prod, isFeatured: res.data.isFeatured} : prod
                ),
                loading: false
            }));
            toast.success(res.data.message);
        } catch (error) {
            set({loading: false});
            toast.error(error?.res?.data?.error || error?.res?.data?.message || "An unexpected error occurred");
        }
    },

    findProductById: async (id) => {
        set({ loading: true });
    
        try {
            const res = await axInstance.get(`/products/${id}`);
            
            // Store the fetched product directly in the product state
            set({ product: res.data.product, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "An unexpected error occurred");
        }
    },
    
}));
