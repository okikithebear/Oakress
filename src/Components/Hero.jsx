import { useState, useEffect } from "react";
import { assets } from '../assets/assets';

const Hero = () => {
  // State for the currently displayed image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of hero images (you can replace these with your actual image URLs from `assets`)
  const images = [
    assets.hero_img,
    
    assets.hero_img3, // Add more images here
  ];

  // Change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5000ms (5 seconds)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full sm:w-1/2 overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          src={images[currentImageIndex]}
          alt="hero"
        />
      </div>
    </div>
  );
};

export default Hero;
