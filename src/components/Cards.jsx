/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function Cards() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Adjust the number of products per page as needed
  const [minPrice, setMinPrice] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter products by minimum price, category, and search query
  useEffect(() => {
    const filteredByPrice = products.filter((product) => product.price >= minPrice);

    const filteredByCategory = categoryFilter
      ? filteredByPrice.filter((product) => product.category === categoryFilter)
      : filteredByPrice;

    const filteredBySearch = searchQuery
      ? filteredByCategory.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredByCategory;

    setFilteredProducts(filteredBySearch);
  }, [minPrice, categoryFilter, searchQuery, products]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to shorten the product title to 10 words
  const shortenTitle = (title) => {
    const words = title.split(" ");
    if (words.length <= 10) {
      return title;
    } else {
      return words.slice(0, 10).join(" ") + "...";
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div style={{ minHeight: "91vh" }} className="bg-gray-800">
      <div className="w-full bg-gray-800">
        <section className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-4">
          {/* Filter Section */}
          <div className="mb-5 ">
            <label htmlFor="search" className="mr-2 font-semibold text-white">
              Search:
            </label>
            <input
              type="text"
              id="search"
              className="w-[500px] px-2 py-1 text-gray-800 bg-white rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <label htmlFor="category" className="mr-2 font-semibold text-white">
                Category:
              </label>
              <select
                id="category"
                className="px-2 py-1 text-gray-800 bg-white rounded-md"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All</option>
                {Array.from(
                  new Set(products.map((product) => product.category))
                ).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="mr-2 font-semibold text-white">
                Min Price:
              </label>
              <input
                type="number"
                id="price"
                className="px-2 py-1 text-gray-800 bg-white rounded-md"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center justify-center w-full p-12 bg-gray-900 rounded-lg shadow-lg"
              >
                <div className="mb-8">
                  <Link to={`/products/${product.id}`}>
                    <img
                      className="object-cover object-center w-64 h-64"
                      src={product.image}
                      alt={product.title}
                    />
                  </Link>
                </div>
                <div className="text-center">
                  <p className="mb-2 text-xl font-bold text-white">
                    {shortenTitle(product.title)}
                  </p>
                  <p className="text-base font-normal text-gray-400">
                    {product.category}
                  </p>
                  <p className="text-base font-normal text-gray-400">{`$${product.price}`}</p>
                </div>
                <div>
                  <button
                    className="p-3 mt-3 font-bold text-white bg-orange-500 rounded-xl hover:scale-105"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
          />
        </section>
      </div>
    </div>
  );
}

// Pagination component (same as previous code)
const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex items-center">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className="px-4 py-2 mx-1 font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
