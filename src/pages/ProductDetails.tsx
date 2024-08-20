import { Button } from "antd"; // Using Ant Design for buttons
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

// Define the Product type for TypeScript
interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  category: string;
  rating: string;
  brand: string;
  creation_time: string;
  discount?: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/product.json`); // Correct path to product.json
        if (res.ok) {
          const data = await res.json();
          const productDetail = data.find((item: Product) => item.id === id);
          setProduct(productDetail || null);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.log("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row lg:space-x-12 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="lg:w-1/2 p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center mb-4">
              <span className="text-lg font-medium text-gray-800 mr-2">
                Price:
              </span>
              <span className="text-2xl font-bold text-primary">
                ৳{product.price}
              </span>
              {product.discount && (
                <span className="text-red-500 text-lg ml-4 line-through">
                  ৳
                  {(
                    parseFloat(product.price) *
                    (1 - product.discount / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-2">Rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-500 ${
                      i < parseInt(product.rating)
                        ? "fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-2">Brand:</span>
              <span className="text-gray-800 font-medium">{product.brand}</span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-gray-600 mr-2">Category:</span>
              <span className="text-gray-800 font-medium">
                {product.category}
              </span>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button
              type="primary"
              className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white"
            >
              <BsCartPlus size={20} />
              <span>Add to Cart</span>
            </Button>
            <Button
              type="default"
              className="flex items-center space-x-2 text-primary border-primary hover:bg-primary-light hover:text-white"
            >
              <AiOutlineHeart size={20} />
              <span>Save to Wishlist</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
