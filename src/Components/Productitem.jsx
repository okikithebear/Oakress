import { useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(CartContext);

  return (
    <Link
      to={`/product/${id}`}
      className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-200">
        <img
          src={image[0]}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          New
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-indigo-600">
          {name}
        </h3>

        {/* Product Price */}
        <p className="mt-2 text-lg font-bold text-red-400">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

// PropTypes Validation
ProductItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProductItem;
