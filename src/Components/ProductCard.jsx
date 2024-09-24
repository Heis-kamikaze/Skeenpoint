import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, price, image, category }) => {
  const navigate = useNavigate();



  const handleClick = () => {

    navigate(`/product/${id}`);
  };

    return (
      <div className="border-gray-400 border p-2 rounded-md text-center items-center justify-center flex flex-col min-w-28 min-h-48 md:w-60 md:h-72 shadow-xl bg-gradient-to-b from-white to-b1-200" onClick={handleClick}>
        <img src={image} alt={name} className="w-16 h-16" />
  
        <div className="font-bold">
          <p className="text-xs pb-2">{category}</p>
          <p className="text-xs pb-2">{name}</p>
          <p className="text-xs pb-2 text-rust-100">&#x20a6;{price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  