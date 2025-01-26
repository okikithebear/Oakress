import { useState } from "react";
import Title from "./Title";

const DesignDetailSlider = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const slides = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1708276242787-387acf1bbd4b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1562151270-c7d22ceb586a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 3",
    },
    {
      image:
        "https://images.unsplash.com/photo-1611824204322-24963b44d68b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 4",
    },
    {
      image:
        "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 5",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-white py-8 my-20">
      {/* Title and Description Section */}
      <div className="text-center mb-10 text-2xl">
        <Title text1="PERFECT" text2="DETAILING" />
        <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-sm sm:text-base text-gray-600">
          Explore the intricate details behind our designs. Each piece is thoughtfully created to complement your unique style.
        </p>
      </div>

      {/* Image Slider Section */}
      <div className="flex w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-2xl flex-wrap justify-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`slide relative flex-shrink-0 transition-[flex-grow] duration-500 ease-in-out rounded-2xl shadow-lg overflow-hidden m-2 cursor-pointer ${
              activeIndex === index ? "flex-grow" : "flex-[1]"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Hover Text with Transition */}
            <div
              className={`absolute bottom-4 left-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-500 ${
                activeIndex === index ? "opacity-100" : ""
              }`}
            >
              <h3 className="text-lg font-bold">{slide.alt}</h3>
              <p className="text-sm">Click for more details</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignDetailSlider;
