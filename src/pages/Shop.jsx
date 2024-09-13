import { useEffect } from 'react';
import { useProductStore } from './../stores/useProductStore';
import ProductCard from './../Components/ProductCard';


const Shop = () => {
  const {product, fetchProducts} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, product]);

  return (
    <div className='pt-12 sm:pt-16 md:pt-24'>
      <div className="mx-3">
        <div className="bg-b1-200 flex flex-col text-center justify-between py-4 mt-2 rounded-xl shadow-2xl">
          <p className="text-xl font-extrabold pb-1">PRODUCTS</p>

          <p className="text-xs">{`Shop > Products`}</p>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 justify-center items-center">
        {Array.isArray(product) && product.length > 0 ? (
            product.map((prod) => (
              <ProductCard 
                key={prod._id}
                id={prod._id} 
                name={prod.name}
                image={prod.image}
                price={prod.price}
                type={prod.category}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Shop;
