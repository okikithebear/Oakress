import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext"; // Ensure the ShopContext is imported
import ProductItem from "../Components/ProductItem"; // Ensure correct casing for ProductItem component

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true); // Adding loading state

  useEffect(() => {
    if (products?.length) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5)); // Set bestSeller with top 5 products
      setLoading(false); // Set loading to false once products are fetched
    }
  }, [products]);

  return (
    <div className="my-10 bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Section Title */}
      <div className="text-center text-2xl py-8">
        <Title text1="BEST" text2="SELLER" />
        <p className="w-3/4 mx-auto text-sm md:text-base text-gray-600">
          Discover our top-selling products that our customers love. These items are popular for their quality, style, and performance. Don’t miss out on these top picks!
        </p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading best sellers...</div> // Loading text or a spinner can go here
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {bestSeller.length > 0 ? (
              bestSeller.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No best sellers found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Call-to-Action */}
      {/* Uncomment this section for a button if needed */}
      {/* <div className="text-center py-6">
        <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-all duration-300">
          View All Best Sellers
        </button>
      </div> */}
    </div>
  );
};

export default BestSeller;
