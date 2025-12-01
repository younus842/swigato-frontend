import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

import CartContext from "../context/CartContext";

import "./index.css";

const CartItem = (props) => (
  <CartContext.Consumer>
    {(value) => {
      const {onIncrementQuantity, removeCartObject, onDecrementQuantity, addToCart, cartList } =
        value;
      const { cartItemDetails } = props;
      const { id, name, quantity, cost, image_url } = cartItemDetails;

      const addButtonClicked = () => {
        const updatedObject = { ...cartItemDetails, quantity: 1 };
        addToCart(updatedObject);
      };

      const decrementQuantity = () => {
        if (quantity === 1) {
          removeCartObject(id);
        } else {
          const updatedList = cartList.map((each) => {
            if (each.id === id) {
              return { ...each, quantity: each.quantity - 1 };
            }
            return each;
          });

          onDecrementQuantity(updatedList);
        }
      };

      const incrementQuantity = () => {
        const updatedList = cartList.map((each) => {
          if (each.id === id) {
            return { ...each, quantity: each.quantity + 1 };
          }
          return each;
        });

        onIncrementQuantity(updatedList);
      };

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={image_url} alt={name} />
          <div className="cart-item-details-container">
            <div className="cart-product-name-brand-container">
              <p className="cart-product-name">{name}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                onClick={decrementQuantity}
                type="button"
                className="quantity-controller-button"
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                onClick={incrementQuantity}
                type="button"
                className="quantity-controller-button"
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-cost-remove-container">
              <p className="cart-total-cost">Rs {cost * quantity}/-</p>
            </div>
          </div>
        </li>
      );
    }}
  </CartContext.Consumer>
);

export default CartItem;
