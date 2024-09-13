import ProductCard from "./ProductCard";

const CategoryItem = ({ category }) => {
  return (
    <div>
      <ProductCard
      id={category._id}
        name={category.name}
        price={category.price}
        image={category.image}
        type={category.type}
      />
    </div>
  );
};

export default CategoryItem;
