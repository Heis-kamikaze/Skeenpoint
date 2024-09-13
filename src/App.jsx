import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import LoginPg from "./pages/LoginPg";
import SignupPg from "./pages/SignupPg";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./Components/LoadingSpinner";
import AdminBoard from "./adminSide/AdminBoard";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import { useCartStore } from "./stores/useCartStore";

const App = () => {
  const {user, checkAuth, checkingAuth} = useUserStore();
  const {getCartItems} = useCartStore();

  useEffect(() => {
    checkAuth();
    
  }, [checkAuth])

  if (checkingAuth) return <LoadingSpinner />

  return (
    <>
      <Header className="f-header" />
      <Routes>
        <Route path="/login" element={!user ? <LoginPg /> : <Navigate to='/' />} />

        <Route path="/dashboard" element={user?.role === 'admin' ?<AdminBoard /> : <Navigate to='/login' />} />

        <Route path="/signup" element={!user ? <SignupPg /> : <Navigate to="/" />} />
        
        <Route path="/" element={<Homepage />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={user ? <Cart /> : <Navigate to='/login' />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
