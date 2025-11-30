import Beauty1 from "../assets/Actual product/Beauty 1.JPG";
import Trends from "../assets/Actual product/Trends .JPG";
import Muse from "../assets/Actual product/Muse .JPG";
import Way from "../assets/Actual product/Way .JPG";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const navigate = useNavigate();

  const collections = [
    { image: Muse, title: "THE OAKRESS MUSE", link: "/muse" },
    { image: Way, title: "THE WAY OF BEAUTY", link: "/beauty" },
    { image: Trends, title: "EXPLORE NEW TRENDS", link: "/trends" },
    { image: Beauty1, title: "SHOP THE LATEST", link: "/collections-page" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Section Title */}
      <div className="text-center mb-16">
        <Title text1="DIVE" text2="INTO ART" />
        <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
          Step into a world where creativity meets craftsmanship. 
          Every Oakress piece tells a story — curated with purpose, designed with emotion, and crafted to inspire.
        </p>
      </div>

      {/* Collection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {collections.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-md bg-black"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-50 transition-all duration-500"
            />

            {/* Overlay Content - slides in from bottom */}
            <div className="absolute inset-0 flex items-end p-6">
              <button
                onClick={() => navigate(item.link)}
                className="translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black px-8 py-3 rounded-full tracking-wide text-sm font-medium"
              >
                {item.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
