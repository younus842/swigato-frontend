import React, { Component } from "react";
import Cookie from "js-cookie";
import { Navigate, useParams } from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";
import "./index.css";
import Loader from "../Loader";
import Footer from "../Footer";
import Dish from "../Dish";
import CartContext from "../context/CartContext";

let times = true

export class IndividualRestaurant extends Component {
  state = {
    foodDishesList: [],
    isLoading: false,
    totalData: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { id } = this.props.params;
    console.log(id);
    this.setState({ isLoading: true });
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/restaurants-list/${id}`;

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const fetchedData = await response.json();

        const updatedData = fetchedData.food_items;
        this.setState({
          foodDishesList: updatedData,
          isLoading: false,
          totalData: [fetchedData]
        });
        console.log(fetchedData);
      }
    } catch (error) {
      console.log("errorrr");
    }
  };

  render() {
    const { id } = this.props.params;
    const { foodDishesList, isLoading, totalData } = this.state;
    const token = Cookie.get("jwt_token");

    if (token === undefined) {
      return <Navigate to="/login" />;
    }

    return (
      <CartContext.Consumer>
        {(value) => {
          const { addRestaurantDetails } = value;

          const addRestaurant = () => {
            addRestaurantDetails(totalData)
          }


          return (
            <div className="home-entire-container">
              <Header />
              <div onClick={addRestaurant} className="home-container">
                <div className="bottom-container-1">
                  <h1 className="home-heading mb-0 pb-0">
                    Popular Dishes
                  </h1>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div className="home-bottom-container">
                      {foodDishesList.map((object) => {
                        const updatedObject = { ...object, restaurantId: id };
                        return (
                          <Dish key={object.id} restaurant={updatedObject} />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <Footer />
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export function RestaurantDetailsWrapper() {
  const params = useParams();
  return <IndividualRestaurant params={params} />;
}
