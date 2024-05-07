/* eslint-disable react-hooks/exhaustive-deps */
import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { useEffect, useState } from "react"; // Import useState
import Cookies from "js-cookie";
import { useSelector } from "react-redux"; // Import useSelector from Redux

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locale/{{lng}}/translation.json",
    },
  });

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  const [cartItemCount, setCartItemCount] = useState(0); // State to store cart item count

  // Retrieve cart state from Redux store
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    window.document.dir = i18n.dir(lng);
    i18n.changeLanguage(lng);
  }, [lng]);

  useEffect(() => {
    // Calculate total number of products in the cart
    const totalCount = cart.products.reduce((acc, product) => acc + product.quantity, 0);
    setCartItemCount(totalCount); // Update cart item count state
  }, [cart]);

  const handleChangeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="sticky top-0 z-10 flex flex-col items-center justify-between px-6 py-3 text-white bg-gray-900 md:flex-row md:px-12 lg:px-24">
      <NavLink to={"/"} className="flex items-center gap-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn2XZRmB0Vda_iv-kSZQpyV2ulVmwsxV2WcIhCw6GOuTGKh-0J3dv-QIe7PIbKDeO9fL4&usqp=CAU"
          alt="logo"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-lg font-semibold">{t("Nafith E-Commerce")}</h1>
      </NavLink>
      
      <div className="flex flex-col items-center gap-5 mt-4 md:flex-row md:mt-0">
        <NavLink to={"/cart"} className="flex items-center gap-2">
          <div className="relative p-4">
            <ShoppingCart size={30} />
            {/* Display the cart item count */}
            {cartItemCount > 0 && (
              <span className="absolute top-0 px-2 py-1 text-xs text-white bg-red-500 rounded-full right-4">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-sm">{t("Cart")}</span>
        </NavLink>
        
        <div className="lang">
          <select
            value={i18n.language}
            onChange={handleChangeLanguage}
            className="px-3 py-1 text-white bg-gray-800 border border-gray-700 rounded"
          >
            <option value="en">{t("English")}</option>
            <option value="ar">{t("Arabic")}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
