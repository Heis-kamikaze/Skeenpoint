import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {  Mail, Lock, ArrowRight, Loader, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { useUserStore } from "../stores/useUserStore";

const LoginPg = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="pb-44 pt-24 md:pt-32 bg-gradient-to-b from-neutral-300 to-stone-400">
      <div className="flex flex-col justify-center items-center py-8 md:py-12 px-10 w-fit cus-lg:w-96  bg-custom-radial mx-auto rounded-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center text-3xl font-extrabold">
            Log in to your account
          </h2>
        </motion.div>
      
        <motion.div
          initial={{ opacity: 0, x: -250 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="focus:ring-rust-100 focus:border-b1-100 block w-full h-10 pl-10 sm:text-sm border-gray-300 rounded-md placeholder-b1-100"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 250 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                required
                className="focus:ring-rust-100 focus:border-b1-100 h-10 block w-full pl-10 sm:text-sm border-gray-300 rounded-md placeholder-b1-100"
                placeholder="********"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
        </motion.div>

        <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rust-100 hover:bg-rust-200 transition duration-150 ease-in-out disabled:opacity-50" disabled={loading}
        >
          {loading ? (
            <>
            <Loader className="h-5 w-5 text-white" />
            </>
          ) : (
            <span className="flex items-center">
              <span>Login</span>
              <LogIn className="h-5 w-5 ml-2" />
            </span>
          )}
        </button>
      </form>
      <div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-rust-100 hover:text-rust-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginPg;
