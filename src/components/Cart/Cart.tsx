import { FunctionComponent, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import { useLocation } from "react-router-dom";
import { CartProps } from "../Products/Products.tsx";
import { Quantifier } from "../Quantifier";
import { Operation } from "../Quantifier/Quantifier.tsx";
import { TotalPrice } from "../TotalPrice";
import classes from "./cart.module.scss";

export const Cart: FunctionComponent = () => {
  const [cart, setCart] = useLocalStorageState<CartProps>("cart", {});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleRemoveProduct = (productId: number): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const handleUpdateQuantity = (productId: number, operation: Operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        if (operation === "increase") {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity + 1,
          };
        } else {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity - 1,
          };
        }
      }
      return updatedCart;
    });
  };

  const getProducts = () => Object.values(cart || {});

  useEffect(() => {
    setTotalPrice(
      getProducts().reduce(
        (accumulator, product) =>
          accumulator + product.price * product.quantity,
        0
      )
    );
  }, []);

  return (
    <section className={classes.cart}>
      <h1>Cart</h1>

      <div className={classes.container}>
        {getProducts().map((product) => (
          <div className={classes.product}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <Quantifier
              removeProductCallback={() => handleRemoveProduct(product.id)}
              productId={product.id}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        ))}
      </div>
      <TotalPrice amount={totalPrice} />
    </section>
  );
};
