import { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import ProductItem from '../Components/Productitem'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';

const CollectionsPage = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("Latest");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  // Combine filtering and sorting in one effect
  useEffect(() => {
    // Start with a copy of all products
    let filtered = [...products];

    // Apply category filter if any are selected
    if (category.length > 0) {
      filtered = filtered.filter(product => category.includes(product.category));
    }

    // Apply sorting based on selected sort option
    if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }
    // For "Latest", we assume the original order is correct or that products are pre-sorted

    setFilterProducts(filtered);
  }, [products, category, sortOption]);

  // Debug: Log category changes
  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 bordrer-t'>
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img
            onClick={() => setShowFilter(!showFilter)}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Dropdown icon"
          />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />
              Oak wonder
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />
              Oak owambe
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />
              Oak bride
            </p>
          </div>
        </div>
        {/*
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden' } sm:block`}>
          <p className="mb-3 text-sm font-medium">Types</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Oak wonder'} />Oak wonder
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Oak owambe'} />Oak owambe
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Oak bride'} />Oak bride
            </p>
          </div>
        </div>
        */}
      </div>
      
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product sort */}
          <select
            className='border-2 border-gray-300 text-sm px-2'
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Latest">Sort by: Latest</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectionsPage;
