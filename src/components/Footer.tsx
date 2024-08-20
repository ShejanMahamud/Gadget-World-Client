import { Button, Input } from "antd";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Company Info */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4">Gadget World</h2>
            <p className="mb-4">
              The best place to find the latest gadgets and electronics at great prices.
            </p>
            <p className="mb-4">
              <strong>Address:</strong> 123 Gadget Street, Tech City, TX 12345
            </p>
            <p className="mb-4">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p>
              <strong>Email:</strong> contact@gadgetworld.com
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="/" className="hover:underline">Home</a></li>
              <li className="mb-2"><a href="/products" className="hover:underline">Products</a></li>
              <li className="mb-2"><a href="/about" className="hover:underline">About Us</a></li>
              <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <div className="flex flex-col sm:flex-row">
              <Input
                placeholder="Enter your email"
                className="mb-4 sm:mb-0 sm:mr-2 rounded-none"
              />
              <Button type="primary" className="w-full sm:w-auto">
                <AiOutlineMail size={20} className="mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-4">
          <a href="https://facebook.com" className="text-white hover:text-gray-400" aria-label="Facebook">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-gray-400" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-gray-400" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-gray-400" aria-label="LinkedIn">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>

      <div className="bg-gray-900 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gadget World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
