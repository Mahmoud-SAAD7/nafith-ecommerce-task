import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast , {Toaster} from "react-hot-toast"


export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(t("Added to cart !"));
  };

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
    return <div>{t("Loading...")}</div>;
  }

  return (
    <div style={{ minHeight: "92vh" }} className="bg-gray-800">
      <section className="text-white bg-gray-800 overflow-hiddenw-full body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <img
              alt={product.title}
              className="object-cover object-center w-full mx-10 border border-gray-200 rounded-lg lg:w-1/3"
              src={product.image}
            />
            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="mb-1 text-sm tracking-widest text-gray-500 uppercase title-font">
                {t(product.category)}
              </h2>
              <h1 className="mb-4 text-3xl font-medium text-orange-500 title-font">
                {t(product.title)}
              </h1>

              <p className="mb-6 leading-relaxed">{t(product.description)}</p>

              <div className="flex items-center justify-around">
                <span className="text-2xl font-medium text-orange-500 title-font">
                  ${product.price}
                </span>
                <button className="flex-shrink-0 px-6 py-2 mx-5 ml-auto text-white bg-orange-500 border-0 rounded focus:outline-none hover:bg-orange-600"  onClick={() => handleAddToCart(product)}>
                  {t("Add to Cart")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster/>
    </div>
  );
}
