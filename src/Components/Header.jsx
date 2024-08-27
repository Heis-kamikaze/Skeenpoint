import { FaUser } from "react-icons/fa6";
import { MdShoppingBag } from "react-icons/md";

const Header = () => {
  return (
    <div className="flex justify-between items-center mt-2 mx-1">
      <div>
        <a href="/">
          <img src="./images/logo.png" alt=" logo" className="w-12 md:w-24" />
        </a>
      </div>

      <div className="justify-center text-center align-middle pb-1 md:text-3xl">
        <ul>
          <a href="/">
            <li className="inline-block px-1 md:px-3">Home</li>
          </a>
          <a href="/shop">
            <li className="inline-block px-1 md:px-3">Shop</li>
          </a>
          <a href="/about">
            <li className="inline-block px-1 md:px-3">About</li>
          </a>
          <a href="/contact">
            <li className="inline-block px-1 md:px-3">Contact</li>
          </a>
        </ul>
      </div>

      <div
        className="flex justify-between
        "
      >
        <div className="w-8 h-8 md:w-16 md:h-16 rounded-full border-2 border-black justify-center items-center py-1 px-1 md:py-2 text-center md:mr-2 md:pl-2">
          <a href="/profile">
            <FaUser className="w-5 h-5 md:w-10 md:h-10" />
          </a>
        </div>
        <div>
          <a href="/cart">
            <MdShoppingBag className="w-8 h-8 md:w-16 md:h-16" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
