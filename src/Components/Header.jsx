import { div } from "framer-motion/client";
import { CircleUserRound, LayoutDashboard, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "./../stores/useCartStore";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const { user } = useUserStore();
  const { cart, getCartItems } = useCartStore();
  const [openDrop, setOpenDrop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      getCartItems();
    }
    setOpenDrop(false);
  }, [user, location]);

  const Drop = () => {
    setOpenDrop(!openDrop);
  };

  const navigate = useNavigate();

  const navSign = () => {
    navigate("/signup");
  };

  const navLog = () => {
    navigate("/login");
  };

  return (
    <div className="fixed z-50 w-full">
      <div className="flex justify-between items-center bg-white pr-1">
        <div>
          <Link to="/">
            <img
              src={"https://res.cloudinary.com/dk60nznrm/image/upload/v1726052557/logo_w3xjkz.png" || "./images/logo.png"}
              alt=" logo"
              className="w-12 md:w-24"
            />
          </Link>
        </div>
        <div className="justify-center text-center align-middle text-sm md:text-xl">
          <ul className={`justify-between hidden sm:block`}>
            <Link to="/">
              <li className="inline-block px-1 md:px-3">Home</li>
            </Link>
            <Link to="/shop">
              <li className="inline-block px-1 md:px-3">Shop</li>
            </Link>
            <Link to="/about">
              <li className="inline-block px-1 md:px-3">About</li>
            </Link>
            <Link to="/contact">
              <li className="inline-block px-1 md:px-3">Contact</li>
            </Link>
          </ul>
        </div>

        <div className="flex gap-1">
          {user ? (
            <div className="flex justify-center items-center gap-1">
              <Link to="/profile">
                <CircleUserRound className="w-6 h-6 md:w-10 md:h-10" />
              </Link>
              {user?.role === "admin" && (
                <Link to="/dashboard">
                  <LayoutDashboard className="w-6 h-6 md:w-10 md:h-10" />
                </Link>
              )}
              <div>
                <Link to="/cart">
                  <MdShoppingBag className="w-6 h-6 md:w-10 md:h-10 mb-0.5" />
                  {cart.length > 0 && (
                    <span className="absolute top-2 sm:top-2 md:top-5 right-7 sm:right-0.5 bg-red-600 text-white font-extrabold rounded-full px-1 sm:px-1 md:px-2 md:py-1 text-xs hover:bg-red-900 transition duration-300 ease-in-out">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center pb-1">
              <button
                className="border border-rust-100 text-rust-100 text-xs md:text-xl text-center font-light px-2 py-1 rounded-md md:rounded-lg mt-2 w-fit md:mr-4 mr-2"
                onClick={navSign}
              >
                SignUp
              </button>
              <button
                className="border border-rust-100 bg-rust-100 text-white text-xs md:text-xl text-center font-light px-2 py-1 rounded-md md:rounded-lg mt-2 w-fit"
                onClick={navLog}
              >
                Login
              </button>
            </div>
          )}
          <button onClick={Drop} className="sm:hidden">
            {openDrop ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openDrop && (
          <motion.div
            key={openDrop}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }} // Exit animation when unmounting
            transition={{ duration: 0.5 }}
            className="justify-evenly shadow-2xl bg-white w-full flex md:static sm:hidden py-5"
          >
            <ul className="justify-evenly bg-white w-full flex md:static sm:hidden py-5">
              <Link to="/">
                <li className="inline-block px-1 md:px-3">Home</li>
              </Link>
              <Link to="/shop">
                <li className="inline-block px-1 md:px-3">Shop</li>
              </Link>
              <Link to="/about">
                <li className="inline-block px-1 md:px-3">About</li>
              </Link>
              <Link to="/contact">
                <li className="inline-block px-1 md:px-3">Contact</li>
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
