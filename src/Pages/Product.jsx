// src/Pages/Product.jsx
import { useContext, useEffect, useState, useCallback, useRef, useMemo,  } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../Context/CartContext";
import { COLORS } from "../Components/colors"; 
import { ukSizeOptions, heightOptions } from "../Components/SizeOptions";
import { Share2, Heart, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import PropTypes from "prop-types";


 

/* --- Size pill --- */
const SizePill = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-2 rounded-md border text-sm font-medium transition ${
      selected ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200 hover:shadow-sm"
    }`}
    aria-pressed={selected}
  >
    {label}
  </button>
);


SizePill.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

/* --- Quantity control --- */
const Quantity = ({ value, setValue }) => (
  <div className="inline-flex items-center gap-2 border rounded-lg overflow-hidden">
    <button
      type="button"
      aria-label="Decrease quantity"
      onClick={() => setValue((v) => Math.max(1, v - 1))}
      className="px-3 py-2 text-lg font-semibold"
    >
      −
    </button>
    <div className="px-4 py-2">{value}</div>
    <button
      type="button"
      aria-label="Increase quantity"
      onClick={() => setValue((v) => v + 1)}
      className="px-3 py-2 text-lg font-semibold"
    >
      +
    </button>
  </div>
);

Quantity.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};



/* --- Recommended carousel (simple) --- */
const Recommended = ({ items, onOpen }) => {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold mb-4">You may also like</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((p) => (
          <article
            key={p._id || p.id}
            className="w-40 flex-shrink-0 rounded-xl overflow-hidden shadow-sm bg-white cursor-pointer"
            onClick={() => onOpen(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(p)}
            aria-label={`Open ${p.name}`}
          >
            <img src={p.image?.[0] || p.image} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-3">
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">₦{p.price?.toLocaleString()}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

Recommended.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      price: PropTypes.number,
      category: PropTypes.string,
    })
  ),
  onOpen: PropTypes.func.isRequired,
};

/* --- Main Product component --- */
export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(CartContext);

  /* Device detection */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [lightboxOpen, setLightboxOpen] = useState(false);   // ✅ HERE

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [isBusty, setIsBusty] = useState(false);
  const [bustMeasurement, setBustMeasurement] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);
  

  const productImageRef = useRef(null);
  const cartIconRef = useRef(document.getElementById("cart-icon"));
  const [activeTab, setActiveTab] = useState("Description");

  // Fetch product
  const fetchProduct = useCallback(() => {
    const p = products?.find((x) => (x._id || x.id) === productId);
    if (!p) return;
    setProductData(p);
    setMainImage(p.image?.[0] || p.image);
    setSelectedColor(p.colors?.[0] || p.color || "");
    setSelectedSize("");
    setSelectedHeight("");
  }, [productId, products]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Recommended: pick 4 other products in same category
  const recommended = useMemo(() => {
    if (!productData || !products) return [];
    return products
      .filter((p) => (p._id || p.id) !== (productData._id || productData.id) && p.category === productData.category)
      .slice(0, 6);
  }, [productData, products]);

  const isAddToCartDisabled = () => {
  if (!selectedColor) return true;
  if (!selectedSize) return true;
  if (selectedSize === "Custom Size" && !customSize.trim()) return true;
  if (!selectedHeight) return true;
  if (selectedHeight === "Custom Height" && !customHeight.trim()) return true;
  // if (isBusty && !bustMeasurement.trim()) return true;

  return false; // everything valid → enabled
};

  // Add to cart handler
  const handleAddToCart = () => {
  if (!productData) return;

  // BASIC VALIDATION
  if (!selectedColor) {
    alert("Please select a color.");
    return;
  }

  if (!selectedSize) {
    alert("Please select a size.");
    return;
  }

  if (selectedSize === "Custom Size" && !customSize.trim()) {
    alert("Please enter your custom size.");
    return;
  }

  if (!selectedHeight) {
    alert("Please select a height option.");
    return;
  }

  if (selectedHeight === "Custom Height" && !customHeight.trim()) {
    alert("Please enter your custom height.");
    return;
  }

  // Busty is OPTIONAL, but if selected, measurement is required
  if (isBusty && !bustMeasurement.trim()) {
    alert("Please enter your bust adjustment measurement.");
    return;
  }

  // BUILD CART ITEM
 const item = {
  id: productData._id || productData.id,
  name: productData.name,
  price: productData.price,
  image: productData.image?.[0] || productData.image,
  quantity,
  size: selectedSize === "Custom Size" ? customSize : selectedSize || null,
  height: selectedHeight === "Custom Height" ? customHeight : selectedHeight || null,
  color: selectedColor || null,
  busty: isBusty || false,
};

// ⭐ Only attach bustMeasurement when busty is true AND user entered a value
if (isBusty && bustMeasurement?.trim()) {
  item.bustMeasurement = bustMeasurement.trim();
}


  // ADD TO CART
  addToCart(item);

  // SUCCESS TOAST
  setAdded(true);
  setTimeout(() => setAdded(false), 1400);

  // FLY-TO-CART ANIMATION
  if (productImageRef.current && cartIconRef.current) {
    const img = productImageRef.current.cloneNode(true);
    const rect = productImageRef.current.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    Object.assign(img.style, {
      position: "fixed",
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      transition: "transform 0.8s ease, opacity 0.8s ease",
      zIndex: 9999,
      borderRadius: "12px",
    });
    document.body.appendChild(img);

    requestAnimationFrame(() => {
      img.style.transform = `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0.2)`;
      img.style.opacity = "0.4";
    });

    img.addEventListener("transitionend", () => img.remove(), { once: true });
  }
};


  // Social share
  const handleShare = async () => {
    const shareData = {
      title: productData.name,
      text: productData.description,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* ignore */
      }
    } else {
      // fallback: copy URL
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

// WhatsApp quick message
const handleWhatsApp = () => {
  const phone = "447575839134"; // correct WhatsApp business number
  const text = encodeURIComponent(`Hi, I'm interested in ${productData?.name} (ID: ${productData?._id}).`);
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
};


  // Open recommended product (navigate)
  const openRecommended = (p) => navigate(`/product/${p._id || p.id}`);

  if (!productData) return <div className="py-10 text-center text-gray-500">Loading product…</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Added Toast */}
      {added && (
        <div className="fixed top-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Added to cart
        </div>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT: images */}
        <div>
          <div className="flex gap-3 mb-4">
            {/* thumbnails */}
            <div className="flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
              {(productData.image || []).map((src, idx) => (
                <button
                  key={idx}
                  aria-label={`Select image ${idx + 1}`}
                  onClick={() => setMainImage(src)}
                  className={`rounded-lg overflow-hidden border ${mainImage === src ? "border-black" : "border-gray-200"}`}
                >
                  <img src={src} alt={`${productData.name} ${idx + 1}`} className="w-20 h-20 object-cover block" />
                </button>
              ))}
            </div>

            {/* main image */}
            <div className="flex-1 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                ref={productImageRef}
                src={mainImage}
                alt={productData.name}
                className="w-full h-full object-contain max-h-[70vh] sm:max-h-[60vh] transition-transform duration-500 hover:scale-105"
                draggable={false}
                onClick={() => {
                  if (isMobile) setLightboxOpen(true);
                }}
              />
            </div>
          </div>

          {/* mobile actions under image */}
          <div className="flex items-center justify-between gap-4 mt-4 lg:hidden">
            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="inline-flex items-center gap-2 text-sm px-3 py-2 border rounded-md">
                <Share2 size={16} /> Share
              </button>
              <button onClick={handleWhatsApp} className="inline-flex items-center gap-2 text-sm px-3 py-2 border rounded-md">
                <MessageCircle size={16} /> WhatsApp
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <Truck size={16} />   Easy Shipping
            </div>
          </div>
        </div>

        {/* RIGHT: product info */}
        <div className="sticky top-20">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl font-semibold">{productData.name}</h1>
            <div className="ml-auto flex items-center gap-3">
              <div className="text-sm text-gray-500">SKU: {productData.sku || productData._id}</div>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="text-2xl font-bold">£{productData.price?.toLocaleString()}</div>
            {productData.compareAt && <div className="text-sm line-through text-gray-400">₦{productData.compareAt?.toLocaleString()}</div>}
          </div>

          <p className="mt-4 text-gray-600">{productData.description}</p>

          {/* Trust badges */}
          <div className="flex gap-4 items-center mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck className="text-green-600" /> Quality guaranteed
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck /> Worldwide delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Heart /> Ethically made
            </div>
          </div>

          {/* selectors */}
          <div className="mt-6 grid grid-cols-1 gap-4">
            {/* Color selector (simple) */}
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
  <select
    className="w-full border rounded-lg p-3"
    value={selectedColor}
    onChange={(e) => setSelectedColor(e.target.value)}
  >
    <option value="">Select Color</option>
    {(productData?.colors?.length ? productData.colors : COLORS).map(
      (color) => (
        <option key={color} value={color}>
          {color}
        </option>
      )
    )}
  </select>
            </div>

            {/* Size pills */}
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {ukSizeOptions.map((s) => (
                  <SizePill key={s} label={s} selected={selectedSize === s} onClick={() => setSelectedSize(s)} />
                ))}
                <SizePill
                  label="Custom Size"
                  selected={selectedSize === "Custom Size"}
                  onClick={() => setSelectedSize("Custom Size")}
                />
                <Link to="/size-guide" className="text-xs underline ml-2 self-center">Size guide</Link>
              </div>

              {selectedSize === "Custom Size" && (
                <input
                  className="mt-3 w-full border rounded-lg p-3"
                  placeholder="Enter custom size (e.g. bust 36, waist 28)"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                />
              )}
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium mb-2">Height</label>
              <div className="flex flex-wrap gap-2">
                {heightOptions.map((h) => (
                  <SizePill key={h} label={h} selected={selectedHeight === h} onClick={() => setSelectedHeight(h)} />
                ))}
                <SizePill
                  label="Custom Height"
                  selected={selectedHeight === "Custom Height"}
                  onClick={() => setSelectedHeight("Custom Height")}
                />
              </div>
              {selectedHeight === "Custom Height" && (
                <input
                  className="mt-3 w-full border rounded-lg p-3"
                  placeholder="Enter custom height in cm"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                />
              )}
            </div>

            {/* Busty option */}
            <div className="flex items-center gap-3">
              <label className="text-sm">Need bust adjustment?</label>
              <input type="checkbox" checked={isBusty} onChange={(e) => setIsBusty(e.target.checked)} className="w-4 h-4" />
              {isBusty && (
                <input
                  className="ml-4 border rounded-lg p-2"
                  placeholder="Bust measurement or cup"
                  value={bustMeasurement}
                  onChange={(e) => setBustMeasurement(e.target.value)}
                />
              )}
            </div>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4 mt-2">
              <Quantity value={quantity} setValue={setQuantity} />
             <button
  onClick={handleAddToCart}
  disabled={isAddToCartDisabled()}
  className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300
    ${isAddToCartDisabled() 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-black hover:bg-gray-800 active:scale-95"}
  `}
>
  Add to Cart
</button>

            </div>

            {/* supplementary actions */}
            <div className="flex gap-3 mt-3">
              <button onClick={handleShare} className="px-3 py-2 border rounded-md text-sm inline-flex items-center gap-2">
                <Share2 size={14} /> Share
              </button>
              <button onClick={handleWhatsApp} className="px-3 py-2 border rounded-md text-sm inline-flex items-center gap-2">
                <MessageCircle size={14} /> Enquire via WhatsApp
              </button>
              <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} className="px-3 py-2 border rounded-md text-sm">
                Reviews
              </button>
            </div>
          </div>
        </div>
      </section>
     {/* Lightbox for mobile */}
{isMobile && lightboxOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">

    {/* Close button */}
    <button
      className="absolute top-5 right-5 text-white text-3xl"
      onClick={() => setLightboxOpen(false)}
    >
      ×
    </button>

    {/* Scrollable full-screen images */}
    <div className="w-full h-full overflow-x-auto flex snap-x snap-mandatory space-x-4">
      {productData.image.map((src, idx) => (
        <img
          key={idx}
          src={src}
          className="w-full h-full object-contain snap-center flex-shrink-0"
          alt={`${productData.name} ${idx + 1}`}
        />
      ))}
    </div>
  </div>
)}


      {/* Recommended products */}
      <Recommended items={recommended} onOpen={openRecommended} />

      {/* Product tabs */}
      {/* Product Tabs */}
<div className="mt-12">
  <div className="flex space-x-8 border-b border-gray-300">
    {["Description", "Size Guide", "Shipping", "Returns"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`pb-3 text-sm uppercase tracking-wide transition-all ${
          activeTab === tab
            ? "border-b-2 border-black text-black font-semibold"
            : "text-gray-500 hover:text-black"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Tab Content */}
  <div className="mt-6 text-gray-700 leading-relaxed">
    {activeTab === "Description" && (
      <div>
        <h4 className="text-lg font-semibold mb-2">Product Details</h4>
        <p>{productData.description}</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li><strong>Fabric:</strong> {productData.fabric || "Premium quality fabric"}</li>
          <li><strong>Care:</strong> {productData.care || "Hand wash or dry clean only"}</li>
          <li><strong>Fit:</strong> {productData.fit || "True to size"}</li>
        </ul>
      </div>
    )}

    {activeTab === "Size Guide" && (
      <div>
        <p className="mb-4">Need help choosing the right size?</p>
        <Link
          to="/size-guide"
          className="text-black underline hover:no-underline"
        >
          View Size Guide →
        </Link>
      </div>
    )}

    {activeTab === "Shipping" && (
      <div>
        <p>We ship worldwide 🌍</p>
        <ul className="mt-2 text-sm space-y-1">
          <li>• Processing time: 2 - 4 business days</li>
          <li>• Standard delivery: 5 - 10 business days</li>
          <li>• Express delivery available at checkout</li>
        </ul>
      </div>
    )}

    {activeTab === "Returns" && (
      <div>
        <p>
          We offer easy returns within <strong>14 days</strong> of delivery.
          Items must be unused, with tags and in original packaging.
        </p>
        <p className="mt-2 text-sm">
          For more details, contact our support team or visit our Return Policy page.
        </p>
      </div>
    )}
  </div>
</div>

    </main>
  );
}

/* PropTypes (optional) */
ProductPage.propTypes = {
  // none, component reads from router and context
};
