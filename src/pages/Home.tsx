import { DatePicker, Input, Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
const { RangePicker } = DatePicker;
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
}

const { Option } = Select;

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{
    minPrice: number | null;
    maxPrice: number | null;
  }>({
    minPrice: null,
    maxPrice: null,
  });
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // Default page size

  useEffect(() => {
    const getProduct = async () => {
      try {
        const queryParams = new URLSearchParams();

        if (search) queryParams.append("search", search);
        if (category) queryParams.append("category", category);
        if (brand) queryParams.append("brand", brand);
        if (priceRange.maxPrice !== null) {
          queryParams.append("maxPrice", priceRange.maxPrice.toString());
        }
        if (priceRange.minPrice !== null) {
          queryParams.append("minPrice", priceRange.minPrice.toString());
        }
        if (sort) queryParams.append("sortBy", sort);
        queryParams.append("page", currentPage.toString());
        queryParams.append("limit", pageSize.toString());

        const res = await fetch(
          `https://gadget-world-server-gamma.vercel.app/products?${queryParams.toString()}`
        );
        const data = await res.json();
        console.log(data);
        setProducts(data.data);
        if (
          search ||
          category ||
          brand ||
          priceRange.maxPrice !== null ||
          priceRange.minPrice !== null ||
          sort
        ) {
          return setTotal(data.totalFilteredProducts);
        } else {
          return setTotal(data.total);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    const getBrands = async () => {
      try {
        const res = await fetch(
          `https://gadget-world-server-gamma.vercel.app/brands`
        );
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCategories = async () => {
      try {
        const res = await fetch(
          `https://gadget-world-server-gamma.vercel.app/categories`
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
    getCategories();
    getBrands();
  }, [search, category, brand, priceRange, sort, currentPage, pageSize]);

  return (
    <div>
      <HeroSection backgroundImage="https://i.ibb.co/Rj3wWsm/ardi-evans-Ams-UQb-D5b-T0-unsplash.jpg" />

      <div className="lg:px-20 px-10 py-10">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 p-4 bg-white rounded-lg shadow-lg">
          {/* Search Input */}
          <Input
            placeholder="Search for products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-3/4">
            {/* Category Select */}
            <Select
              placeholder="Select Category"
              onChange={(value) =>
                setCategory(value === "" ? undefined : value)
              }
              className="w-full md:w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <Option value="">All Categories</Option>
              {categories &&
                categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
            </Select>

            {/* Brand Select */}
            <Select
              placeholder="Select Brand"
              onChange={(value) => setBrand(value === "" ? undefined : value)}
              className="w-full md:w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <Option value="">All Brands</Option>
              {brands &&
                brands.map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
            </Select>

            {/* Min Price Input */}
            <Input
              className="w-full md:w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Min Price"
              type="number"
              value={priceRange.minPrice ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setPriceRange((prev) => ({
                  ...prev,
                  minPrice: value === "" ? null : Number(value),
                }));
              }}
            />

            {/* Max Price Input */}
            <Input
              className="w-full md:w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Max Price"
              type="number"
              value={priceRange.maxPrice ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setPriceRange((prev) => ({
                  ...prev,
                  maxPrice: value === "" ? null : Number(value),
                }));
              }}
            />
          </div>

          {/* Sort By Select */}
          <Select
            placeholder="Sort by"
            onChange={(value) => setSort(value)}
            className="w-full md:w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <Option value="price-asc">Price: Low to High</Option>
            <Option value="price-desc">Price: High to Low</Option>
            <Option value="creation_time-desc">Date Added: Newest First</Option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                description={product.description}
                price={product.price}
                category={product.category}
                rating={product.rating}
                brand={product.brand}
                creation_time={product.creation_time}
                discount={10} // Optional discount (if applicable)
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger
            onShowSizeChange={(current, size) => setPageSize(size)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
