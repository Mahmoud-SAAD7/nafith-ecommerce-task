import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Paginator from "./ui/Paginator";
import axiosInstance from "../config/axios.config";
import Modal from "./ui/Modal";
import { useTranslation } from "react-i18next";

export default function Cards() {
  const { t } = useTranslation();

  // STATE
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [minPrice, setMinPrice] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [sortBy, setSortBy] = useState("none");
  const [sortedProducts, setSortedProducts] = useState([]);

  const dispatch = useDispatch();

  const onCloseAddModal = () => {
    setIsOpenAddModal(false);
    setCurrentStep(1);
    setFormData({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
    setErrors({});
  };

  const onOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const isValid = validateStep1();
      if (isValid) setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    let errors = {};
    if (!formData.title || formData.title.length < 5) {
      errors.title = t("Title is required and should be at least 5 characters");
    }
    if (isNaN(formData.price) || formData.price.length > 5) {
      errors.price = t("Price should be a number with maximum length of 5");
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (currentStep === 2) {
      const isValid = validateStep2();
      if (isValid) {
        try {
          const res = await axiosInstance.post("/products", formData);
          console.log(res.data);
          setProducts([...products, res.data]);
          setIsOpenAddModal(false);
          setCurrentStep(1);
          setFormData({
            title: "",
            price: "",
            description: "",
            image: "",
            category: "",
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const validateStep2 = () => {
    let errors = {};
    if (!formData.description || formData.description.length < 10) {
      errors.description = t("Description is required and should be at least 10 characters");
    }
    if (!formData.image) {
      errors.image = t("Image is required");
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //Fetch the products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get("/products");
        setProducts(data);
        setFilteredProducts(data);
        setSortedProducts(data); // Initialize sorted products with the fetched data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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

  // Sort products based on sortBy state
  useEffect(() => {
    if (sortBy === "none") {
      setSortedProducts(filteredProducts);
    } else {
      const sorted = [...filteredProducts];
      sorted.sort((a, b) => {
        if (sortBy === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      setSortedProducts(sorted);
    }
  }, [sortBy, filteredProducts]);
  

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className="flex items-center justify-center mb-5 ">
            <input
              type="text"
              id="search"
              className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-1/2 bg-transparent text-white"
              placeholder={t("Search for products...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-col justify-between mb-4 space-y-5 md:flex">
            <div className="flex justify-between">
              <div className="text-white sort-by ">
                <label htmlFor="sortBy">{t("Sort By")}</label>
                <select 
                  id="sortBy"
                  className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-1/2 bg-transparent text-slate-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="none">{t("None")}</option>
                  <option value="asc">{t("Ascending")}</option>
                  <option value="desc">{t("Descending")}</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className="mr-2 font-semibold text-white">
                  {t("Category")}:
                </label>
                <select
                  id="category"
                  className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-1/2 bg-transparent text-slate-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">{t("All")}</option>
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
                  {t("Lowest price")}:
                </label>
                <input
                  type="number"
                  id="price"
                  className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-1/2 bg-transparent text-white"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min={1}
                />
              </div>
            </div>
            <button
              className="px-3 py-3 font-medium text-white duration-200 bg-indigo-700 rounded-lg hover:bg-indigo-800"
              onClick={() => onOpenAddModal()}
            >
              {t("Add Product")}
            </button>
            {/* Add Product Modal */}
            <Modal
              isOpen={isOpenAddModal}
              closeModal={onCloseAddModal}
              title={t("Add a new Product")}
            >
              {currentStep === 1 && (
                <form className="space-y-3">
                  <input
                    className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md w-full"
                    type="text"
                    placeholder={t("title")}
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                    name="title"
                  />
                  {errors.title && <p className="text-red-600">{errors.title}</p>}
                  <input
                    className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md w-full"
                    type="number"
                    placeholder={t("price")}
                    value={formData.price}
                    onChange={(e) => handleChange(e)}
                    name="price"
                  />
                  {errors.price && <p className="text-red-600">{errors.price}</p>}
                  <button
                    className="px-3 py-3 font-medium duration-200 bg-indigo-700 rounded-lg hover:bg-indigo-800"
                    onClick={handleNextStep}
                    disabled={Object.keys(errors).length > 0}
                  >
                    {t("Next")}
                  </button>
                </form>
              )}
              {currentStep === 2 && (
                <form className="space-y-3">
                  <input
                    className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md w-full"
                    type="text"
                    placeholder={t("Description")}
                    value={formData.description}
                    onChange={(e) => handleChange(e)}
                    name="description"
                  />
                  {errors.description && (
                    <p className="text-red-600">{errors.description}</p>
                  )}
                  <input
                    className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md w-full"
                    type="text"
                    placeholder={t("Image URL")}
                    value={formData.image}
                    onChange={(e) => handleChange(e)}
                    name="image"
                  />
                  {errors.image && <p className="text-red-600">{errors.image}</p>}
                  <button
                    className="px-3 py-3 font-medium text-white duration-200 bg-indigo-700 rounded-lg hover:bg-indigo-800"
                    onClick={handlePrevStep}
                  >
                    {t("Previous")}
                  </button>
                  <button
                    className="px-3 py-3 mx-5 font-medium text-white duration-200 bg-indigo-700 rounded-lg hover:bg-indigo-800"
                    onClick={handleAddProduct}
                    disabled={Object.keys(errors).length > 0}
                  >
                    {t("Add product")}
                  </button>
                </form>
              )}
            </Modal>
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
                    {t("Add to Cart")}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Paginator
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
          />
        </section>
      </div>
    </div>
  );
}
