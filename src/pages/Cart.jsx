import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice";
import { useTranslation } from "react-i18next";

function Cart() {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Function to handle removing a product from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Function to handle increasing the quantity of a product
  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // Function to handle decreasing the quantity of a product
  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Calculate total price
  const total = cart.products.reduce(
    (acc, product) => acc + (typeof product.price === 'number' ? product.price * product.quantity : 0),
    0
  );

  // Function to handle checkout
  const handleCheckout = () => {
    dispatch(clearCart());
    alert("checkout successful");
  };

  return (
    <div style={{ minHeight: "91vh" }} className="font-bold text-white bg-gray-800">
      <h1 className="mb-10 text-2xl font-bold text-center">{t("Cart Items")}</h1>
      <div className="justify-center max-w-5xl px-6 mx-auto md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.products.map((product) => (
            <div
              key={product.id}
              className="justify-between p-6 mb-6 bg-white rounded-lg shadow-md sm:flex sm:justify-start"
            >
              <img
                src={product.image}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">{product.description}</p>
                </div>
                <div className="flex justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center text-black border-gray-100">
                    <button
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleDecreaseQuantity(product.id)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <input
                      className="w-8 h-8 text-xs text-center bg-white border outline-none"
                      type="number"
                      value={product.quantity}
                      min="1"
                      readOnly
                    />
                    <button
                      className="px-3 py-1 duration-100 bg-gray-100 rounded-r cursor-pointer hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleIncreaseQuantity(product.id)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-black">
                    <p className="text-sm">{typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'N/A'}</p>
                    <p className="text-sm">{typeof product.total === 'number' ? `$${product.total.toFixed(2)}` : 'N/A'}</p>
                    <button
                      className="text-sm text-red-500"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      {t("Remove")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 text-center">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={handleCheckout}
            >
              {t("Checkout")}
            </button>
            <p className="mt-2 text-lg font-semibold">
              {t("Total")}: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
