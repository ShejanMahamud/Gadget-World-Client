import React from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string; // Since price is a string, we'll need to convert it for calculation
  category: string;
  rating: string; // Rating is also a string, so we'll convert it to a number
  brand: string;
  creation_time: string;
  discount?: number; // Optional discount percentage
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  description,
  price,
  rating,
  discount = 0,
  onAddToCart,
}) => {
  // Calculate discounted price
  const priceNumber = parseFloat(price);
  const navigate = useNavigate();
  const discountedPrice = discount
    ? (priceNumber - (priceNumber * discount) / 100).toFixed(2)
    : priceNumber.toFixed(2);

  // Convert rating to number
  const ratingNumber = parseFloat(rating);

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="relative max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
          -{discount}%
        </div>
      )}

      {/* Product Image */}
      <img
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        src={image}
        alt={name}
      />

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        {/* Rating */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`h-4 w-4 ${
                i < ratingNumber ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        {/* Product Description */}
        <p className="text-gray-600 text-sm mt-2">
          {description.slice(0, 100)}...
        </p>{" "}
        {/* Truncate description */}
        {/* Price and Add to Cart Button */}
        <div className="mt-4 flex justify-between items-center lg:flex-row flex-col gap-y-5">
          <div>
            {/* Discounted Price */}
            <span className="text-primary font-bold text-lg">
              ${discountedPrice}
            </span>
            {/* Original Price */}
            {discount > 0 && (
              <span className="text-gray-500 line-through text-sm ml-2">
                ${priceNumber.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            className="flex items-center px-3 py-2 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-dark transition duration-300"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
