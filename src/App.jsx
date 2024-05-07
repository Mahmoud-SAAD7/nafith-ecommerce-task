import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";

import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { useEffect } from "react";
import Cookies from "js-cookie";
i18n
  .use(initReactI18next).use(LanguageDetector).use(HttpApi) // passes i18n down to react-i18next
  .init({
    
    fallbackLng: "en",
    detection :{
      order: ['cookie','htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend :{
      loadPath: '/locale/{{lng}}/translation.json'
    }
  });

function App() {
  const lng = Cookies.get("i18next") || "en"
  useEffect(()=>{
    window.document.dir = i18n.dir()
  },[lng])
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`/products/:id`} element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
