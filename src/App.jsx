import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Footer from './Components/Footer';
import Header from './Components/Header';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/shop',
    element: <Shop />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },

]);

const App = () => {
  return (
    <>
      <Header className=''/>
        <RouterProvider router={router} />
      <Footer />
    </>
  )
}

export default App