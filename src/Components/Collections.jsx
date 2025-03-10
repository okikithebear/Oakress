import { assets } from '../assets/assets';
import Title from "./Title";

const Collections = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <Title text1="DIVE" text2="INTO ART" />
        <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
          Discover a world of creativity and inspiration. Explore our curated collections, designed to spark your imagination and transform your space with timeless elegance.
        </p>
      </div>

      {/* Grid container with 2x2 layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

        {/* Grid Item 1 */}
        <div className="relative group rounded-lg overflow-hidden shadow-xl transition-transform transform hover:scale-105">
          <img
            src={assets.hero_img}
            alt="THE OAKRESS MUSE"
            className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
            <button className="bg-white text-black py-3 px-8 font-semibold rounded-full hover:bg-gray-200 transition-all duration-200">
              THE OAKRESS MUSE
            </button>
          </div>
        </div>

        {/* Grid Item 2 */}
        <div className="relative group rounded-lg overflow-hidden shadow-xl transition-transform transform hover:scale-105">
          <img
            src={assets.hero_img}
            alt="THE WAY OF BEAUTY"
            className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
            <button className="bg-white text-black py-3 px-8 font-semibold rounded-full hover:bg-gray-200 transition-all duration-200">
              THE WAY OF BEAUTY
            </button>
          </div>
        </div>

        {/* Grid Item 3 */}
        <div className="relative group rounded-lg overflow-hidden shadow-xl transition-transform transform hover:scale-105">
          <img
            src={assets.hero_img}
            alt="Explore New Trends"
            className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
            <button className="bg-white text-black py-3 px-8 font-semibold rounded-full hover:bg-gray-200 transition-all duration-200">
              EXPLORE NEW TRENDS
            </button>
          </div>
        </div>

        {/* Grid Item 4 */}
        <div className="relative group rounded-lg overflow-hidden shadow-xl transition-transform transform hover:scale-105">
          <img
            src={assets.hero_img}
            alt="Shop the Latest"
            className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
            <button className="bg-white text-black py-3 px-8 font-semibold rounded-full hover:bg-gray-200 transition-all duration-200">
              SHOP THE LATEST
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Collections;
