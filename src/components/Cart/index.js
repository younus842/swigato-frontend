import CartListView from "../CartListView";
import CartSummary from "../CartSummary";
import Header from "../Header";
import CartContext from "../context/CartContext";
import "./index.css";
import { useState } from "react";

const Cart = () => {
  const [stateVariable, setStateVariable] = useState(false);

  const changeVariable = () => {
    setStateVariable(true);
  };

  return (
    <CartContext.Consumer>
      {(value) => {
        let obj = "";
        const { restaurantId, cartList } = value;
        if (restaurantId.length !== 0) {
          obj = restaurantId[0];
          console.log(obj.name)

        }

        return (
          <>
            <Header />
            <div className="cart-container">
              {stateVariable ? (
                <div className="order-container">
                  <p className="para-success">Order Placed Successfully !</p>
                </div>
              ) : cartList.length === 0 ? (
                <div className="order-container empty-container">
                  <p className="para-success empty">Cart Empty</p>
                </div>
              ) : (
                <div className="cart-content-container">
                  <div className="cart-heading-container">
                    <img
                      className="cart-product-image cart-header-image"
                      src={obj.image_url}
                      alt={obj.name}
                    />
                    <p className="cart-total-price name-restaurant">{obj.name}</p>
                  </div>
                  <CartListView />
                  <div className="summary-container">
                    <CartSummary changeVariable={changeVariable} />
                  </div>
                </div>
              )}
            </div>
          </>
        );
      }}
    </CartContext.Consumer>
  );
};

export default Cart;
