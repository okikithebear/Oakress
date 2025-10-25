import HeroImage from '../assets/Actual product/Hero 2.JPG';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-[#fafafa]">
      
      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-20 px-8 sm:px-16">
        <div className="text-[#1a1a1a] space-y-5">
          
          <p className="text-xs tracking-[0.25em] text-gray-500 uppercase">
            New Collection
          </p>

          <h1 className="font-light text-4xl sm:text-5xl leading-tight uppercase tracking-wide">
            Elegance in <br />Every Detail
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md">
            Step into timeless style with Oakress — where modern sophistication meets luxury craftsmanship.
          </p>

<button className="mt-6 px-8 py-3 text-sm tracking-wider border border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out uppercase">
  <Link to="/collections" className="w-full h-full block">
    Shop Collection
  </Link>
</button>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full sm:w-1/2 h-[450px] sm:h-[650px] overflow-hidden relative">
        <img
          src={HeroImage}
          alt="Oakress Fashion Model"
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-[1.2s]"
        />
      </div>
    </div>
  );
};

export default Hero;
