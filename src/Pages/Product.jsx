import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { CartContext } from "../Context/CartContext";
import { ukSizeOptions, heightOptions } from "../Components/SizeOptions";

// --- Reusable Select Option Component ---
const SelectOption = ({
  label,
  options,
  value,
  onChange,
  customInput,
  setCustomInput,
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <select
      className="border p-2 mt-1 w-full"
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {value === `Custom ${label}` && (
      <input
        type="text"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        className="border p-2 mt-2 w-full"
        placeholder={`Enter custom ${label.toLowerCase()}`}
      />
    )}
  </div>
);

SelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  customInput: PropTypes.string,
  setCustomInput: PropTypes.func,
  placeholder: PropTypes.string,
};

// --- Quantity Selector Component ---
const QuantitySelector = ({ quantity, increaseQty, decreaseQty }) => (
  <div className="flex items-center border rounded-lg overflow-hidden">
    <button
      onClick={decreaseQty}
      className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
    >
      –
    </button>
    <span className="px-4 text-gray-800 font-medium">{quantity}</span>
    <button
      onClick={increaseQty}
      className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
    >
      +
    </button>
  </div>
);

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  increaseQty: PropTypes.func.isRequired,
  decreaseQty: PropTypes.func.isRequired,
};

// --- Tabs Component ---
const ProductTabs = ({ tab, setTab, description }) => {
  const reviews = [
    "Great product! Highly recommend.",
    "Quality is good but shipping took longer than expected.",
  ];

  return (
    <div className="mt-16">
      <div className="flex border-b">
        <button
          className={`px-5 py-3 text-sm font-medium ${
            tab === "description"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setTab("description")}
        >
          Description
        </button>
        <button
          className={`px-5 py-3 text-sm font-medium ${
            tab === "reviews"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setTab("reviews")}
        >
          Reviews ({reviews.length})
        </button>
      </div>
      <div className="px-4 py-6 text-sm text-gray-700">
        {tab === "description" && (
          <>
            <p>{description}</p>
            <p className="mt-3">
              Fabric: Non-stretch chiffon lined with satin.
            </p>
            <p>Model is 5&#39;8&quot; wearing UK size 6 in Mint.</p>
          </>
        )}
        {tab === "reviews" &&
          reviews.map((review, i) => (
            <p key={i} className="mb-4 border-b pb-3 last:border-none">
              {review}
            </p>
          ))}
      </div>
    </div>
  );
};

ProductTabs.propTypes = {
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

// --- Main Product Component ---
const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(CartContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState();
  const [tab, setTab] = useState("description");
  const [isBusty, setIsBusty] = useState(false);
  const [bustMeasurement, setBustMeasurement] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [selectedColor, setSelectedColor] = useState("Mint");

  const [addedToCart, setAddedToCart] = useState(false);

  const productImageRef = useRef(null);
  const cartIconRef = useRef(document.getElementById("cart-icon"));

  const fetchProductData = useCallback(() => {
    try {
      const product = products.find((item) => item._id === productId);
      if (!product) throw new Error("Product not found");
      setProductData(product);
      setImage(product.image[0]);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [productId, products]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!productData) return;

    const cartItem = {
      id: productData._id || productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.image[0],
      quantity,
      busty: isBusty,
      bustMeasurement: isBusty ? bustMeasurement : "",
      size: selectedSize === "Custom Size" ? customSize : selectedSize,
      height:
        selectedHeight === "Custom Height" ? customHeight : selectedHeight,
      color: selectedColor,
    };

    addToCart(cartItem);

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);

    // Fly-to-cart animation
    if (productImageRef.current && cartIconRef.current) {
      const img = productImageRef.current.cloneNode(true);
      const imgRect = productImageRef.current.getBoundingClientRect();
      const cartRect = cartIconRef.current.getBoundingClientRect();

      img.style.position = "fixed";
      img.style.left = `${imgRect.left}px`;
      img.style.top = `${imgRect.top}px`;
      img.style.width = `${imgRect.width}px`;
      img.style.height = `${imgRect.height}px`;
      img.style.transition = "all 0.8s ease-in-out";
      img.style.zIndex = 1000;
      document.body.appendChild(img);

      requestAnimationFrame(() => {
        img.style.left = `${cartRect.left}px`;
        img.style.top = `${cartRect.top}px`;
        img.style.width = "0px";
        img.style.height = "0px";
        img.style.opacity = "0.5";
      });

      img.addEventListener("transitionend", () => img.remove());
    }
  };

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 relative">
      {/* Toast */}
      {addedToCart && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          Added to cart!
        </div>
      )}

      <div className="flex gap-12 sm:flex-row flex-col">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border hover:border-black"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              ref={productImageRef}
              className="w-full h-auto"
              src={image}
              alt="main"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-semibold text-2xl">{productData.name}</h1>
          <p className="text-lg mt-1 text-gray-600">₦{productData.price}</p>
          <p className="text-sm text-gray-400 mt-1">
            Shipping calculated at checkout.
          </p>

          <p className="mt-4 text-gray-700">{productData.description}</p>

          <p className="mt-3 text-red-600 italic text-sm">
            The {productData.name} is a snug fit, kindly ensure actual
            bust/waist measurements are provided.
          </p>

          <div className="mt-6 space-y-4">
            {/* Color */}
            <div>
              <label className="block text-sm font-medium">Color</label>
              <select
                className="border p-2 mt-1 w-full"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option>Mint</option>
              </select>
            </div>

            {/* Size */}
            <SelectOption
              label="Size"
              options={ukSizeOptions}
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              customInput={customSize}
              setCustomInput={setCustomSize}
              placeholder="Please choose"
            />

            {/* Height */}
            <SelectOption
              label="Height"
              options={heightOptions}
              value={selectedHeight}
              onChange={(e) => setSelectedHeight(e.target.value)}
              customInput={customHeight}
              setCustomInput={setCustomHeight}
              placeholder="Please choose"
            />

            {/* Busty */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">
                Busty version for bigger bust
              </label>
              <input
                type="checkbox"
                checked={isBusty}
                onChange={(e) => setIsBusty(e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            {isBusty && (
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Bust measurement / cup size
                </label>
                <input
                  type="text"
                  value={bustMeasurement}
                  onChange={(e) => setBustMeasurement(e.target.value)}
                  className="border p-2 w-full"
                  placeholder="Enter measurement / cup size"
                />
              </div>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex items-center gap-3">
            <QuantitySelector
              quantity={quantity}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all"
            >
              Add to Cart
            </button>
          </div>

          {/* Guarantee */}
          <div className="text-sm text-gray-500 mt-6 space-y-1">
            <p>✔ 100% original product</p>
            <p>✔ Quality material</p>
            <p>✔ Made with utmost care</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ProductTabs
        tab={tab}
        setTab={setTab}
        description={productData.description}
      />
    </div>
  );
};

export default Product;
