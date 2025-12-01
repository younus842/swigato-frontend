import { React, Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import Image from '../../assets/star.gif'
let buttonClicked = false;

class Dish extends Component {
  render() {
    const { restaurant } = this.props;
    const { rating, cost, name, id, image_url } = restaurant;
    return (
      <CartContext.Consumer>
        {(value) => {
          const {
            onIncrementQuantity,
            onDecrementQuantity,
            cartList,
            addToCart,
            removeCartObject,
            addRestaurantDetails,
          } = value;
          const filteredList = cartList.filter((each) => {
            if (each.id === id) {
              return each;
            }
            return false;
          });

          const obj = filteredList[0];
          let val = undefined;
          let numberOfDishes = 0;
          if (filteredList.length !== 0) {
            val = obj.quantity;
            numberOfDishes = obj.quantity;
          }

          const incrementQuantity = () => {
            const updatedList = cartList.map((each) => {
              if (each.id === id) {
                return { ...each, quantity: each.quantity + 1 };
              }
              return each;
            });

            onIncrementQuantity(updatedList);
          };

          const addButtonClicked = () => {
            const updatedObject = { ...restaurant, quantity: 1 };
            addToCart(updatedObject);
            buttonClicked = true;
          };

          const decrementQuantity = () => {
            if (numberOfDishes === 1) {
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

          return (
            <div className="restaurant-container">
              <img
                className="restaurant-image dish-image"
                src={image_url}
                alt="image"
              />
              <div className="right-res-container">
                <h3 className="res-name dish-name">{name}</h3>
                <p className="rating para">Rs {cost}.00</p>
                <div className="ratings-container">
                  <img
                    className="star"
                    src={Image}
                    alt="image"
                  />
                  <p className="ratings para">{rating}</p>
                </div>
                {val === undefined ? (
                  <button onClick={addButtonClicked} className="add-button">
                    Add
                  </button>
                ) : (
                  <div className="button-container m-0 d-flex align-items-center">
                    <button onClick={decrementQuantity} className="item-button">
                      -
                    </button>
                    <p className="item-para">{numberOfDishes}</p>
                    <button onClick={incrementQuantity} className="item-button">
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default Dish;
