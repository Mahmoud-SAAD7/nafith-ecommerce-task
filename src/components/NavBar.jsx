import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between py-3 text-white bg-gray-900 px-36">
      <NavLink to={"/"} className="flex items-center gap-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn2XZRmB0Vda_iv-kSZQpyV2ulVmwsxV2WcIhCw6GOuTGKh-0J3dv-QIe7PIbKDeO9fL4&usqp=CAU"
          alt="logo"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-lg font-semibold">Nafith E-C</h1>
      </NavLink>
      <NavLink to={"/cart"} className="flex items-center gap-2">
        <ShoppingCart size={30} />
        <span>Cart</span>
      </NavLink>
    </div>
  );
}
