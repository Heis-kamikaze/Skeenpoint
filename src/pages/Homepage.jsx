import { useEffect, useState } from "react";
import CategoryItem from "../Components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import { Link } from 'react-router-dom';
import ProductCard from "../Components/ProductCard";
import axInstance from "../lib/axios.js";
import toast from "react-hot-toast";




const Homepage = () => {
  const { product, fetchProducts } = useProductStore();
  const [recommendations, setRecommendations] = useState([]);
  const triprod = []
  
  useEffect(() => {
      const fetchRecommendations = async () => {
          try {
              const res = await axInstance.get("/products/recommendations");
              setRecommendations(res.data.products);
          } catch (error) {
              console.error(error);
              toast.error(error.response.data.message || "An unexpected error occurred");
          }
      }
      fetchRecommendations();
      fetchProducts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCategories = Array.isArray(product)
  ? product.filter((prod) => {
      // Check if the selected category is 'All' or the product category includes the selected category
      const matchesCategory = selectedCategory === "All" || prod.category.includes(selectedCategory);
      
      // Add condition to check if the product is featured (you can modify this to your needs)
      const matchesFeatured = prod.isFeatured === true;  // or just `prod.isFeatured` if it's already boolean

      // Return products that match both category and featured status
      return matchesCategory && matchesFeatured;
    })
  : [];



  return (
    <div className="">
      <div className="pt-12 sm:pt-16 md:pt-24">
        <div className="px-4 md:pl-5 mb-5 bg-b1-200 flex">
          <div className="text-left flex flex-col justify-center md:justify-around md:my-28">
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

      <div className="sm:flex justify-around items-center p-4">
        <div className="mb-3">
          <img src="./images/3fem.png" alt="" className="rounded-b-lg" />
        </div>

        <div className="text-center sm:text-left sm:w-96">
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

      <div className="mx-5 flex-col justify-center items-center">
        <div className="flex justify-between items-center">
          <p className="text-lg font-extrabold">Featured Product</p>
          <div className="flex justify-between text-sm">
            <div className={`px-1 cursor-pointer ${selectedCategory === "All" ? "text-rust-100" : ""}`} onClick={() => setSelectedCategory("All")}>All</div>
            <div className={`px-1 cursor-pointer ${selectedCategory === "Facial" ? "text-rust-100" : ""}`} onClick={() => setSelectedCategory("Facial", "Facial + Body")}>Facial</div>
            <div className={`px-1 cursor-pointer ${selectedCategory === "Body" ? "text-rust-100" : ""}`} onClick={() => setSelectedCategory("Body", "Facial + Body")}>Body</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 justify-center items-center mt-3">
          {filteredCategories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>

      <div></div>
      <div className="mx-5 mt-10 flex-col justify-center items-center">
        <div className="flex justify-between items-center">
        <p className="text-lg font-extrabold">Best Seller</p>
          <div className="bg-rust-100 text-sm text-white px-3 py-0.5 rounded-xl">
            <Link to={'/shop'}>
              View All
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 justify-center items-center mt-3">
          {recommendations.map((prod) => (
            <ProductCard 
            key={prod._id}
            id={prod._id} 
            name={prod.name}
            image={prod.image}
            price={prod.price}
            type={prod.category}
            />
          ))}
      </div>
      </div>
      <div className="mx-4 mt-12 py-5 flex justify-center text-center items-center rounded-lg bg-b1-100 sm:h-40">
        <p className="text-xl sm:text-3xl md:text-6xl font-bold text-white">
          ...Where skin meets perfection
        </p>
      </div>
    </div>
  );
};

export default Homepage;
