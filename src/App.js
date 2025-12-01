import "./App.css";
import { Component } from "react";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { RestaurantDetailsWrapper } from "./components/IndividualRestaurant";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartContext from "./components/context/CartContext";

class App extends Component {
  state = {
    cartList: [],
    restaurantId: [],
  };

  onDecrementQuantity = (product) => {
    this.setState({ cartList: product });
  };

  onIncrementQuantity = (product) => {
    this.setState({ cartList: product });
  };

  addToCart = (product) => {
    const { cartList } = this.state;

    const check = cartList.filter((each) => {
      if (each.restaurantId === product.restaurantId) {
        return true;
      }
      return false;
    });

    if (check.length === 0) {
      this.setState({ cartList: [product] });
    } else {
      this.setState((prevState) => {
        return { cartList: [...prevState.cartList, product] };
      });
    }
  };

  addCartItem = (product) => {
    const { cartList } = this.state;

    const checkProduct = cartList.filter((each) => {
      if (each.id === product.id) {
        return true;
      }
      return false;
    });

    if (checkProduct.length === 0) {
      this.setState((prevState) => ({
        cartList: [...prevState.cartList, product],
      }));
    } else {
      this.onIncrementQuantity(product.id);
    }
  };

  removeCartObject = (id) => {
    this.setState((prevState) => {
      const filtertedList = prevState.cartList.filter((each) => {
        if (each.id !== id) {
          return true;
        }
        return false;
      });

      return { cartList: filtertedList };
    });
  };

  addRestaurantDetails = (obj) => {
    this.setState({ restaurantId: obj });
  };

  clearCart = () => {
    this.setState({ cartList: [] });
  };

  render() {
    const { cartList, restaurantId } = this.state;
    console.log(cartList);
    console.log(restaurantId);
    return (
      <CartContext.Provider
        value={{
          cartList,
          restaurantId,
          addCartItem: this.addCartItem,
          removeCartObject: this.removeCartObject,
          onIncrementQuantity: this.onIncrementQuantity,
          onDecrementQuantity: this.onDecrementQuantity,
          addRestaurantDetails: this.addRestaurantDetails,
          addToCart: this.addToCart,
          clearCart: this.clearCart,
        }}
      >
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route
                exact
                path="/restaurant/:id"
                element={<RestaurantDetailsWrapper />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </CartContext.Provider>
    );
  }
}

export default App;
