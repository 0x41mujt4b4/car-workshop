import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import InvoiceMenu from "../components/InvoiceMenu";
import AddProduct from "../components/AddProduct";
import ProductsMenu from "../components/ProductsMenu";
import Header from "../components/Header";

const POSpage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:5000/products");
    setProducts(await result.data);
    setIsLoading(false);
  };

  const addProductToCard = async (product) => {
    // check if the adding product exist
    let findProductInCart = await cart.find((item) => {
      return item.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.sell_price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });
      setCart(newCart);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.sell_price,
      };
      setCart([...cart, addingProduct]);
    }
  };

  const removeProductFromCart = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };

  const removeProduct = async (toDelete) => {
    const newProducts = products.filter(product => toDelete.id !== product.id)
    setProducts(newProducts)
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((cartItem) => {
      newTotalAmount = newTotalAmount + cartItem.totalAmount;
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);
  return (
    <>
      <Header
                heading="دنبلاب لصيانة السيارات"
                // paragraph="الاسبيرات"
                linkName="الرجوع للصفحة الرئيسية"
                linkUrl="/home"
                />
      {showAddProduct ? (
        <AddProduct setShowAddProduct={setShowAddProduct} />
      ) : null}
      <div className="grid grid-cols-[1fr_2fr] max-h-screen p-4 gap-8">
            <InvoiceMenu
              cart={cart}
              totalAmount={totalAmount}
              removeProductFromCart={removeProductFromCart}
            />
        {/* <div className="px-12 w-full">
          </div> */}
          {/* <div className="inline-grid w-full"> */}
            <ProductsMenu isLoading={isLoading}
             products={products} addProductToCard={addProductToCard}
             removeProduct={removeProduct}
              />
          {/* </div> */}
        {/* <div className="w-auto p-3">
        </div> */}
        
      </div>
    </>
  );
};

export default POSpage;
