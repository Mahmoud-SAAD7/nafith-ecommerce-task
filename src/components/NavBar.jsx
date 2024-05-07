import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { t } = useTranslation();

  return (
    <div className="sticky top-0 z-10 flex flex-col items-center justify-between px-6 py-3 text-white bg-gray-900 md:flex-row md:px-12 lg:px-24">
      {/* Logo and Brand */}
      <NavLink to={"/"} className="flex items-center gap-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn2XZRmB0Vda_iv-kSZQpyV2ulVmwsxV2WcIhCw6GOuTGKh-0J3dv-QIe7PIbKDeO9fL4&usqp=CAU"
          alt="logo"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-lg font-semibold">{t("Nafith E-Commerce")}</h1>
      </NavLink>
      
      {/* Navigation Links and Language Selector */}
      <div className="flex flex-col items-center gap-5 mt-4 md:flex-row md:mt-0">
        {/* Cart Link */}
        <NavLink to={"/cart"} className="flex items-center gap-2">
          <ShoppingCart size={30} />
          <span className="text-sm">{t("Cart")}</span>
        </NavLink>
        
        {/* Language Selector */}
        <div className="lang">
          <select
            onChange={(e) => {
              i18next.changeLanguage(e.target.value);
            }}
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
