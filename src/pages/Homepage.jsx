import { useEffect, useState } from "react";
import CategoryItem from "../Components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import axInstance from "../lib/axios.js";
import toast from "react-hot-toast";

const Homepage = () => {
  const { product, fetchProducts } = useProductStore();
  const [recommendations, setRecommendations] = useState([]);
  const triprod = [
    {
      _id: { $oid: "66e4d99e4469ef4b2666fdb9" },
      name: "Vitamin C + Turmeric + Glow Booster Lightening Oil",
      description:
        "This combination can provide benefits such as \nbrightening the skin, reducing hyperpigmentation \nand promoting an overall healthy competition.\nSuitable for all skin types.",
      image:
        "https://res.cloudinary.com/dk60nznrm/image/upload/v1726274310/products/mrkn5apezhqseaxdotdy.png",
      ingredients:
        "Water(Aqua),cetyl Alcohol,Glycerin,Dimethicone,Butyrospermum Parkii(shea) butter,ceteareth-20. \nAscorbic acid,curcuma longa(turmeric) root extract, aloe barbadenis leaf juice, Tetrahexyldecyl \nAcetate, Isopropyl Myristate,Glyceryl Stearate, Fragrance,Pyrus Malus(Apple) fruit extract, \nHelianthus Annuus(Sunflower) extract,Synthetic beeswax, Terminalia Ferdinandiana fruit extract, \nFerulic acid, Panax Ginseng Root extract, Cetearyl Ethylhexanoate, Cetaeryl Phosphate, Xanthan \ngum, Oryza Sativa(Rice)Bran extract, Rosmarinus Officinalis(Rosemary) leaf extract, Tocopherol,\nTetrasodium Glutamate Diacetate, Carbomer, Limonene,Linalool Phenoxyethanol,Ethylhexylglycerin,\nCaprylyl Glycol,Hexylene Glycol, Sodium Hydroxide, Mineral oil, Cyclopentasiloxane, Isopropyl Palmitate, Almond oil, Vitis Vinifera (Grape) Seed oil, Arctostaphylos \nUva-Ursi Leaf Extract, Carthage’s Tincorius (Safflower) Seed oil and Glycyrrhiza Glabra (Licorice) Root Extract,\nCurcumin Extract, Caprylic/Capric Triglyceride and Saffron Extract, Gluthation, Probiotic Lactobacillus,\nFragrance, BHT, Tocopheryl Acetate (Vitamin E Acetate).",
      usage:
        "After shower, apply both products to the area as required and gently massage until complete absorption.",
      price: 30000,
      category: "Facial + Body",
      isFeatured: true,
      createdAt: { $date: { $numberLong: "1726273950447" } },
      updatedAt: { $date: { $numberLong: "1727193281919" } },
      __v: { $numberInt: "0" },
    },
    {
      _id: { $oid: "66f180f8a20a56716f7b9d8e" },
      name: "Vitamin C + Turmeric + Retinol + Peptide",
      description:
        "Combining vitamin C, turmeric, retinol and peptides \ncreates a potent blend for anti-aging skincare. \nVitamin C and turmeric provide antioxidant benefits, \nwhile retinol helps with cell turnover and collagen\nproduction making this combination effective for \ntargeting multiple signs of aging.\nSuitable for all skin types.",
      image:
        "https://res.cloudinary.com/dk60nznrm/image/upload/v1727103223/products/ysrqtsgvx1z8cryfvu4i.png",
      ingredients:
        "Water(Aqua),cetyl Alcohol,Glycerin,Dimethicone,Butyrospermum Parkii(shea) butter,ceteareth-20. \nAscorbic acid,curcuma longa(turmeric) root extract, aloe barbadenis leaf juice, Tetrahexyldecyl \nAcetate, Isopropyl Myristate,Glyceryl Stearate, Fragrance,Pyrus Malus(Apple) fruit extract, \nHelianthus Annuus(Sunflower) extract,Synthetic beeswax, Terminalia Ferdinandiana fruit extract, \nFerulic acid, Panax Ginseng Root extract, Cetearyl Ethylhexanoate, Cetaeryl Phosphate, Xanthan \ngum, Oryza Sativa(Rice)Bran extract, Rosmarinus Officinalis(Rosemary) leaf extract, Tocopherol,\nTetrasodium Glutamate Diacetate, Carbomer, Limonene,Linalool Phenoxyethanol,Ethylhexylglycerin,\nCaprylyl Glycol,Hexylene Glycol, Sodium Hydroxide, Aqua, Butylene Glycol, Glycerin, Betaine, Sorbeth-30, Retinyl Palmitate, 3-0-Ethyl Ascorbic Acid, Prunus\nAmygladus Dulcis(sweet almond)Seed Extract,1.2-Hexanediol. Hydroxyacetophenone, Allatoin,\nPEG-40 Hydrogenated Castor Oil, Carbomer. Aminomethyl Propanol ,Panthenol, XanthanGum,\nDisodium EDTA, Sodium Hyaluronate, Cyclohexane, Caprylic/capric Triglyceride, Polyglyceryl-10 \nMyristate,PEG-15 Glyceryl Stearate, Octyldodecanol, Tocopheryl Acetate, Pentylene Glycol, Lecithin,\nIsononyl isononanoate, Parfum, Hydrolyzed Rice Protein, Hydrogenated Lecithin, BHT, Phenoxyethanol,\nTetrasodium EDTA, Benzyl Benzoate.",
      usage:
        "Morning and night, after bathing, apply Vitamin C to the area required and gently massage until complete absorption. In the evening, apply a few drops of Retinol + Peptide oil on a cleansed dry skin and gently massage into the skin until fully absorbed.",
      price: 30000,
      category: "Facial + Body",
      isFeatured: true,
      createdAt: { $date: { $numberLong: "1727103224243" } },
      updatedAt: { $date: { $numberLong: "1727193285786" } },
      __v: { $numberInt: "0" },
    },
    {
      _id: { $oid: "66f185b3a20a56716f7b9d9a" },
      name: "Retinol + Peptide + Glow Booster Oil",
      description:
        "Combining retinol and peptides with a glow booster\nlightening oil creates a skincare blend that addresses\nboth anti-aging concerns and helps brighten the skin.\nRetinol and peptide work together to reduce wrinkles\nand promote skin firmness, while the glow booster\nlightening oil can help even out skintone and enhance\nradiance.",
      image:
        "https://res.cloudinary.com/dk60nznrm/image/upload/v1727104434/products/qrwpaq77xh6yeojxx1mr.png",
      ingredients:
        "Aqua, Butylene Glycol, Glycerin, Betaine, Sorbeth-30, Retinyl Palmitate, 3-0-Ethyl Ascorbic Acid, Prunus\nAmygladus Dulcis(sweet almond)Seed Extract,1.2-Hexanediol. Hydroxyacetophenone, Allatoin,\nPEG-40 Hydrogenated Castor Oil, Carbomer. Aminomethyl Propanol ,Panthenol, XanthanGum,\nDisodium EDTA, Sodium Hyaluronate, Cyclohexane, Caprylic/capric Triglyceride, Polyglyceryl-10 \nMyristate,PEG-15 Glyceryl Stearate, Octyldodecanol, Tocopheryl Acetate, Pentylene Glycol, Lecithin,\nIsononyl isononanoate, Parfum, Hydrolyzed Rice Protein, Hydrogenated Lecithin, BHT, Phenoxyethanol,\nTetrasodium EDTA, Benzyl Benzoate, Mineral oil, Cyclopentasiloxane, Isopropyl Palmitate, Almond oil, Vitis Vinifera (Grape) Seed oil, Arctostaphylos \nUva-Ursi Leaf Extract, Carthage’s Tincorius (Safflower) Seed oil and Glycyrrhiza Glabra (Licorice) Root Extract,\nCurcumin Extract, Caprylic/Capric Triglyceride and Saffron Extract, Gluthation, Probiotic Lactobacillus,\nFragrance, BHT, Tocopheryl Acetate (Vitamin E Acetate).",
      usage:
        "After shower, apply Lightening Oil to the area as required and gently massage until complete absorption.  In the evening, Apply a few drops of Retinol + Peptide oil on a cleansed dry skin and gently massage into the skin until fully absorbed.",
      price: 30000,
      category: "Body",
      isFeatured: true,
      createdAt: { $date: { $numberLong: "1727104435502" } },
      updatedAt: { $date: { $numberLong: "1727193290079" } },
      __v: { $numberInt: "0" },
    },
  ];

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axInstance.get("/products/recommendations");
        setRecommendations(res.data.products);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response.data.message || "An unexpected error occurred"
        );
      }
    };
    fetchRecommendations();
    fetchProducts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCategories = Array.isArray(product)
    ? product.filter((prod) => {
        // Check if the selected category is 'All' or the product category includes the selected category
        const matchesCategory =
          selectedCategory === "All" ||
          prod.category.includes(selectedCategory);

        // Add condition to check if the product is featured (you can modify this to your needs)
        const matchesFeatured = prod.isFeatured === true; // or just `prod.isFeatured` if it's already boolean

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

            <p className="font-extrabold text-xl cus-lg:text-5xl md:text-3xl text-wrap">
              Glow Beyond Limits with Skeenpoint Oil
            </p>

            <p className="text-xs md:text-xl text-wrap">
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
            <img src="./images/fem.png" alt="" className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="sm:flex justify-between items-center p-4">
        <div className="p-4">
          <img src="./images/3fem.png" alt="" className="rounded-b-lg" />
        </div>

        <div className="text-center sm:w-3/4 sm:text-left px-auto">
          <p className="text-3xl sm:text-2xl md:text-3xl font-extrabold mb-2">
            Glowing skin is a result of proper skincare
          </p>

          <p className="text-sm md:text-base cus-lg:text-xl mb-2">
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
            <div
              className={`px-1 cursor-pointer ${
                selectedCategory === "All" ? "text-rust-100" : ""
              }`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </div>
            <div
              className={`px-1 cursor-pointer ${
                selectedCategory === "Facial" ? "text-rust-100" : ""
              }`}
              onClick={() => setSelectedCategory("Facial", "Facial + Body")}
            >
              Facial
            </div>
            <div
              className={`px-1 cursor-pointer ${
                selectedCategory === "Body" ? "text-rust-100" : ""
              }`}
              onClick={() => setSelectedCategory("Body", "Facial + Body")}
            >
              Body
            </div>
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
            <Link to={"/shop"}>View All</Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 justify-center items-center mt-3">
          {triprod.map((prod) => (
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
