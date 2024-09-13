import { create } from "zustand";
import axInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    user:null,
    loading:false,
    chackingAuth:true,

    signup: async ({name, email, password, confirmPassword}) => {
        set({loading:true});

        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            set({loading:false});
            return;
        }

        try {
            const res = await axInstance.post("/auth/signup", {name, password, email});
            set({user:res.data.user, loading:false});
            toast.success(res.data.message);
        } catch (error) {
            set({loading:false});
            toast.error(error.response.data.error || error.response.data.message || "An unexpected error occurred");
        }
    },


    login: async ({email, password}) => {       
        set({loading:true});

        if(!email || !password){ 
            toast.error("All fields are required");
            set({loading:false});
            return;
        }

        try {
            const res = await axInstance.post("/auth/login", {email, password});
            set({user:res.data.user, loading:false});
            toast.success(res.data.message);
        } catch (error) {
            set({loading:false});
            toast.error(error.response.data.error || error.response.data.message || "An unexpected error occurred");
        }
    },


    logout: async () => {
        set({loading:true});

        try {
            await axInstance.post("/auth/logout");
            set({user:null, loading:false});
            toast.success(res.data.message);
        } catch (error) {
            set({loading:false});
            toast.error(error.response.data.error || error.response.data.message || "An unexpected error occurred");
        }
    },


    checkAuth: async () => {
        set({checkingAuth:true});

        try {
            const res = await axInstance.get("/auth/profile");
            set({user:res.data, checkingAuth:false});
        } catch (error) {
            set({user:null, checkingAuth:false});
        }
    }
}));

