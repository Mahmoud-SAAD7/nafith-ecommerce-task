import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: "92vh" }} className="bg-gray-800">
      <section className="text-white bg-gray-800 overflow-hiddenw-full body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <img
              alt={product.title}
              className="object-cover object-center w-full border border-gray-200 rounded lg:w-1/3"
              src={product.image}
            />
            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="text-sm tracking-widest text-gray-500 title-font">
                {product.category}
              </h2>
              <h1 className="m-3 mb-1 text-3xl font-medium text-orange-500 underline title-font">
                {product.title}
              </h1>

              <p className="mt-5">{product.description}</p>
              <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-200">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="w-6 h-6 border-2 border-gray-300 rounded-full focus:outline-none" />
                  <button className="w-6 h-6 ml-1 bg-gray-700 border-2 border-gray-300 rounded-full focus:outline-none" />
                  <button className="w-6 h-6 ml-1 bg-red-500 border-2 border-gray-300 rounded-full focus:outline-none" />
                </div>
              </div>
              <div className="flex">
                <span className="text-2xl font-medium text-orange-500 title-font">
                  ${product.price}
                </span>
                <button className="flex px-6 py-2 ml-auto text-white bg-orange-500 border-0 rounded focus:outline-none hover:bg-orange-600">
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
