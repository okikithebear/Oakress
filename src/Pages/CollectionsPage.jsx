import { useContext, useState, useMemo } from "react";
import { CartContext } from "../Context/CartContext";
import ProductItem from "../Components/Productitem";

const SORT_OPTIONS = [
  { value: "Latest", label: "Latest" },
  { value: "low-high", label: "Price: Low to High" },
  { value: "high-low", label: "Price: High to Low" },
];

const CollectionsPage = () => {
  const { products } = useContext(CartContext);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Latest");

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (sortOption === "low-high") filtered.sort((a, b) => a.price - b.price);
    if (sortOption === "high-low") filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [products, selectedCategories, sortOption]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 sm:px-6 lg:px-20 pt-16 sm:pt-20 pb-20 sm:pb-32 bg-[#faf9f8]">
      {/* Sidebar */}
      <aside className="lg:w-64 w-full border border-neutral-200 bg-white p-6 rounded-xl shadow-sm h-fit lg:sticky lg:top-24">
        <div className="flex items-center justify-between lg:block">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-neutral-800">
            Filters
          </h3>
          <button
            className="lg:hidden text-sm text-neutral-600 mt-2 underline"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Hide" : "Show"}
          </button>
        </div>

        <div className={`${showFilter ? "block" : "hidden lg:block"} mt-6`}>
          <p className="text-sm text-neutral-700 font-medium mb-3">Categories</p>
          <div className="space-y-3">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer text-sm text-neutral-700 hover:text-black"
                >
                  <input
                    type="checkbox"
                    className="accent-black w-4 h-4"
                    value={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))
            ) : (
              <p className="text-neutral-500 text-sm">No categories</p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Products */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <h1 className="uppercase text-2xl sm:text-3xl tracking-wide font-light text-neutral-800">
            All Collections
          </h1>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-neutral-300 bg-white text-sm px-3 py-2 rounded-md focus:border-black outline-none w-full sm:w-auto"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((item) => (
              <div key={item._id}>
                <ProductItem
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-neutral-500">
            <p className="uppercase tracking-wide">No products found</p>
            <p className="text-sm mt-2">Try changing filters or explore all categories</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CollectionsPage;
