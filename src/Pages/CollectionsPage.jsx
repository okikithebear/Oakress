import { useContext, useState, useMemo } from "react";
import Title from "../Components/Title";
import ProductItem from "../Components/Productitem";
import { CartContext } from "../Context/CartContext"; // ✅ use CartContext
import { assets } from "../assets/assets";

const SORT_OPTIONS = [
  { value: "Latest", label: "Sort by: Latest" },
  { value: "low-high", label: "Sort by: Low to High" },
  { value: "high-low", label: "Sort by: High to Low" },
];

const CollectionsPage = () => {
  const { products } = useContext(CartContext); // ✅ fixed

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Latest");

  // Extract categories dynamically from products
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  // Handle category toggle
  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  // Filter + sort products in one place with useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCategories, sortOption]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-gray-200">
      {/* Sidebar Filters */}
      <aside className="min-w-60">
        <div className="flex items-center justify-between sm:block">
          <p className="my-2 text-xl font-semibold flex items-center gap-2">
            Filters
          </p>
          <button
            className="sm:hidden"
            onClick={() => setShowFilter((prev) => !prev)}
            aria-expanded={showFilter}
          >
            <img
              className={`h-3 transition-transform duration-300 ${
                showFilter ? "rotate-90" : ""
              }`}
              src={assets.dropdown_icon}
              alt="Toggle filters"
            />
          </button>
        </div>

        <div
          className={`border border-gray-300 rounded-md pl-5 py-3 mt-4 transition-all duration-300 ${
            showFilter ? "block" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))
            ) : (
              <p className="text-gray-500 text-xs">No categories available</p>
            )}
          </div>
        </div>
      </aside>

      {/* Products Section */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <Title text1="All" text2="Collections" />
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-black"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No products found matching your selection.
          </p>
        )}
      </main>
    </div>
  );
};

export default CollectionsPage;
