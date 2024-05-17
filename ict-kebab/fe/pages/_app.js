import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GlobalContextProvider from "@/store";
import CartContext from "@/store/CartContext";
import { useState } from "react";

export default function App({ Component, pageProps }) {

  const [cart, setCart] = useState({ food: {}, drink: {}, sauce: {} });
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.some((i) => i.id === item.id && i.type === item.type);
      const isTypeInCart = prevItems.some((i) => i.type === item.type);
  
      if (isItemInCart) {
        toast.error("Dieses Item ist bereits im Warenkorb");
        return prevItems;
      } else if (isTypeInCart) {
        toast.error("Ein Item dieser Kategorie ist bereits im Warenkorb");
        return prevItems;
      } else if(!session){
        toast.error("Bitte loggen Sie sich ein, um fortzufahren")
      }
      else {
        toast.success("Item hinzugefügt");
        return [...prevItems, item];
      }
    });
  };
  
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      let updatedCart = { ...prevCart };
      let category = item.category;
      let id = item.id;
      if (updatedCart[category] && updatedCart[category][id]) {
        delete updatedCart[category][id];
        return updatedCart;
      }
      return prevCart;
    });
  
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };


  return (
    <GlobalContextProvider>
        <CartContext.Provider value={{ cart, cartItems, addToCart, removeFromCart}}>
          <Layout>
            <div className="innerPage">
              <Component {...pageProps} />
              <ToastContainer />
            </div>
          </Layout>
        </CartContext.Provider>
    </GlobalContextProvider>
  )
}