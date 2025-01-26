import PropTypes from "prop-types";
import { ShopContext } from "./ShopContext";
import { products } from "../assets/assets";

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const value = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export default ShopContextProvider;
