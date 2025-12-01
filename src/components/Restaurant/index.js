import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa6";


const Restaurant = (props) => {
  const { restaurant } = props;
  const { user_rating, menu_type, name, id, image_url } = restaurant;
  const { rating, total_reviews } = user_rating;

  return (
    <Link
      to={`/restaurant/${id}`}
      style={{ textDecoration: "none", color: "#000" }}
      className="link"
    >
      <div className="restaurant-container">
        <img className="restaurant-image" src={image_url} alt="image" />
        <div className="right-res-container">
          <h3 className="res-name">{name}</h3>
          <p className="variety para">{menu_type}</p>
          <div className="ratings-container">
            <p className="rate para"><FaRegStar className="star"/></p>
            <p className="rating para">{rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Restaurant;
