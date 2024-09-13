import { useEffect, useState } from "react";
import CategoryItem from "../Components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import { Link } from 'react-router-dom';




const Homepage = () => {
  const { product, fetchProducts } = useProductStore();
  
  useEffect(() => {
      fetchProducts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCategories =  Array.isArray(product)
  ? 
    selectedCategory === "All"
      ? product
      : product.filter((category) => category.category.includes (selectedCategory)
    ) : [];
  return (
    <div className="">
      <div className="pt-12 sm:pt-16 md:pt-24">
        <div className="px-4 md:pl-5  mb-5 bg-b1-200 flex">
          <div className="text-left flex flex-col justify-around md:my-28">
            <p className="text-xs md:text-xl font-extrabold">
              Welcome to Skeenpoint Family
            </p>

            <p className="font-extrabold text-xl cus-lg:text-6xl md:text-4xl text-wrap">
              Glow Beyond Limits with Skeenpoint Oil
            </p>

            <p className="text-xs md:text-2xl text-wrap">
              Our products are crafted with carefully selected ingredients to
              nourish, hydrate and transform your skin. Join us on a journey to
              healthier and glowing skin.
            </p>

            <Link to={`/shop`}>
            <button className="bg-rust-100 text-white text-xs md:text-xl text-center font-light px-4 py-2 rounded-md md:rounded-lg mt-2 w-fit">
              Shop Now
            </button>
            </Link>
          </div>

          <div>
            <img
              src="./images/fem.png"
              alt=""
              className="md:max-w-sm cus-lg:max-w-2xl h-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-4">
        <div className="mb-3">
          <img src="./images/3fem.png" alt="" className="" />
        </div>

        <div className="text-center">
          <p className="text-3xl font-extrabold mb-2">
            Glowing skin is a result of proper skincare
          </p>

          <p className="text-sm md:text-xl mb-2">
            At Skeenpoint, we believe that beauty goes beyond skin deep. Our
            journey began with a passion for skincare rooted in the principles
            of purity, science and sustainability. Explore our range of skincare
            essentials and embrace a skicare routine that celebrates your unique
            beauty.
          </p>

          <Link to={`/shop`}>
          <button className="bg-rust-100 text-white text-xs md:text-xl text-center font-light px-4 py-2 rounded-md md:rounded-lg mt-2 md:w-fit sm:w-fit">
            Shop Now
          </button>
          </Link>
        </div>
      </div>

      <div className="mx-5">
        <div className="flex justify-between items-center">
          <p className="text-lg font-extrabold">Featured Product</p>
          <div className="flex justify-between text-sm">
            <div className="px-1 cursor-pointer" onClick={() => setSelectedCategory("All")}>All</div>
            <div className="px-1 cursor-pointer" onClick={() => setSelectedCategory("Facial", "Facial + Body")}>Facial</div>
            <div className="px-1 cursor-pointer" onClick={() => setSelectedCategory("Body", "Facial + Body")}>Body</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 justify-center items-center">
          {filteredCategories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>

      <div></div>
      <div></div>
      <div className="mx-4 py-5 flex justify-center text-center rounded-lg bg-b1-100">
        <p className="text-xl md:text-3xl font-bold text-white">
          ...Where skin meets perfection
        </p>
      </div>
    </div>
  );
};

export default Homepage;
