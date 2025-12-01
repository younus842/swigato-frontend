import React, { Component } from "react";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";
import "./index.css";
import Restaurant from "../Restaurant";
import Loader from "../Loader";
import Footer from "../Footer";
import Carousel from "../Carousel";
import CartContext from "../context/CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
let times = 0;

class Home extends Component {
  state = {
    restaurantsList: [],
    lastPage: 1,
    activePage: 1,
    isLoading: false,
    searchInput: "",
  };

  componentDidMount() {
    this.fetchData();
    this.fetchClothing()
  }

  fetchClothing = async () => {
    const formData = new FormData();
    formData.append("email", "your@email.com");
    formData.append("password", "yourpassword");
    formData.append("outfit", "black hoodie with cargo pants");
    formData.append("gender", "man");
    formData.append("country", "India");
    formData.append("age", "24");
    formData.append("ratio", "9:16");
    formData.append("background", "Hyderabad street at night");
    formData.append("negative", "no hat, no sunglasses");
    formData.append("body_type", "fit");
    const url = "https://thenewblack.ai/api/1.1/wf/clothing";
    const options = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(url, options)
    const data = await response.json()
    console.log('clothing api data here')
    console.log(data)
  };

  fetchData = async () => {
    this.setState({ isLoading: true });
    const { activePage, searchInput } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    const limit = 9;
    const offset = (activePage - 1) * limit;
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}`;

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

        const updatedData = fetchedData.restaurants;
        const totalPages = Math.ceil(fetchedData.total / 9);
        this.setState({
          restaurantsList: updatedData,
          lastPage: totalPages,
          isLoading: false,
        });
        console.log(updatedData);
        console.log(fetchedData);
      }
    } catch (error) {
      console.log("errorrr");
    }
  };

  leftButton = () => {
    const { activePage } = this.state;
    if (activePage !== 1) {
      this.setState((prevState) => {
        return { activePage: prevState.activePage - 1 };
      }, this.fetchData);
    }
  };

  rightButton = () => {
    const { activePage, lastPage } = this.state;
    if (activePage !== lastPage) {
      this.setState((prevState) => {
        return { activePage: prevState.activePage + 1 };
      }, this.fetchData);
    }
  };

  onSearch = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  searchFilter = async () => {
    const { searchInput } = this.state;

    if (searchInput === "") {
      this.fetchData();
      return;
    }
    this.setState({ isLoading: true });
    const jwtToken = Cookies.get("jwt_token");

    try {
      const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        this.setState({ restaurantsList: data.restaurants, isLoading: false });
      } else {
        console.log("error");
        this.setState({ restaurantsList: [], isLoading: false });
      }
    } catch (error) {
      console.log("errorrr");
    }
  };

  render() {
    const { restaurantsList, lastPage, activePage, isLoading, searchInput } =
      this.state;
    const token = Cookie.get("jwt_token");

    if (token === undefined) {
      return <Navigate to="/login" />;
    }

    return (
      <CartContext.Consumer>
        {(value) => {
          return (
            <div className="home-entire-container">
              <Header />
              <div className="home-container">
                <div className="bottom-container-1">
                  <Carousel />

                  <div className=" home-heading-container">
                    <div className="left-heading-box">
                      <h1 className="home-heading mb-0">Popular Restaurants</h1>
                      <p className="para-heading">
                        Select Your favourite restaurant special dish and make
                        your day happy...
                      </p>
                    </div>
                    <div className="search-container">
                      <input
                        onChange={this.onSearch}
                        type="search"
                        className="search"
                        placeholder="Search"
                        value={searchInput}
                      />
                      <button
                        onClick={this.searchFilter}
                        className="search-button"
                        type="button"
                        data-testid="searchButton"
                      >
                        <BsSearch className="search-icon" />
                      </button>
                    </div>
                  </div>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div className="home-bottom-container">
                      {restaurantsList.map((object) => {
                        return (
                          <Restaurant key={object.id} restaurant={object} />
                        );
                      })}
                    </div>
                  )}

                  {restaurantsList.length !== 0 && (
                    <div className="button-container m-0 d-flex justify-content-center align-items-center">
                      <button
                        onClick={this.leftButton}
                        className="button-left-right m-2"
                      >
                        <FaArrowLeft />
                      </button>
                      <p className="para class">
                        {activePage} of {lastPage}
                      </p>
                      <button
                        onClick={this.rightButton}
                        className="button-left-right m-2"
                      >
                        <FaArrowRight />
                      </button>
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

export default Home;
