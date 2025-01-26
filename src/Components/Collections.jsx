import { assets } from '../assets/assets';
import Title from "./Title";

const Collections = () => {
  return (
    <div className="container mx-auto px-4 py-10">
<div className="text-center mb-10 text-2xl">
        <Title text1="DIVE" text2="INTO ART" />
        <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-sm sm:text-base text-gray-600">
        Discover a world of creativity and inspiration. Explore our curated collections, designed to spark your imagination and transform your space with timeless elegance.
        </p>
      </div>

      {/* Grid container with 2x2 layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Grid Item 1 */}
        <div className="relative group">
          <img
            src={assets.hero_img}
            alt="THE OAKRESS MUSE"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
            <button className="bg-white text-black py-2 px-6 font-semibold rounded-sm hover:bg-gray-200 transition-all duration-200">
              THE OAKRESS MUSE
            </button>
          </div>
        </div>

        {/* Grid Item 2 */}
        <div className="relative group">
          <img
            src={assets.hero_img}
            alt="THE WAY OF BEAUTY"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
            <button className="bg-white text-black py-2 px-6 font-semibold rounded-sm hover:bg-gray-200 transition-all duration-200">
              THE WAY OF BEAUTY
            </button>
          </div>
        </div>

        {/* Grid Item 3 */}
        <div className="relative group">
          <img
            src={assets.hero_img}
            alt="Explore New Trends"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
            <button className="bg-white text-black py-2 px-6 font-semibold rounded-sm hover:bg-gray-200 transition-all duration-200">
              EXPLORE NEW TRENDS
            </button>
          </div>
        </div>

        {/* Grid Item 4 */}
        <div className="relative group">
          <img
            src={assets.hero_img}
            alt="Shop the Latest"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
            <button className="bg-white text-black py-2 px-6 font-semibold rounded-sm hover:bg-gray-200 transition-all duration-200">
              SHOP THE LATEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
