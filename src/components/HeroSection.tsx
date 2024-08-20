import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface HeroSectionProps {
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImage }) => {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(135deg, #1B2850, #FF9F43)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Your Gateway to the Latest Gadgets
        </h1>
        <h2 className="text-lg md:text-2xl font-light mb-8">
          Discover, Compare, and Purchase the Best in Technology
        </h2>

        {/* Call to Action */}
        <div className="w-full flex items-center justify-center">
          <button className="flex items-center py-3 px-6 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition duration-300">
            <FaShoppingCart className="mr-2" />
            Shop the Latest Gadgets
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
