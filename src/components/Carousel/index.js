import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "../Loader";

export default function Carousel() {
  const [offers, setOffers] = useState([]);
  const [loader, setLoader] = useState(false);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
      autoplay: true,
  autoplaySpeed: 2000, // 2 seconds
  pauseOnHover: true, 
  };

  useEffect(() => {
    const getImages = async () => {
      setLoader(() => true);
      const token = Cookies.get("jwt_token");
      const url = "https://apis.ccbp.in/restaurants-list/offers";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);

      const data = await response.json();
      console.log(data.offers);
      setLoader(() => false);
      setOffers(() => data.offers);
    };
    getImages();
  }, []);

  return (
    <div
      className="carousel-container"
      style={{ width: "94%", maxWidth: "1110px", margin: "0 auto" }}
    >
      {loader ? (
        <Loader />
      ) : (
        <Slider {...settings}>
          {offers.map((each) => {
            return (
              <div className="carousel-box">
                <img
                  className="carousel-image"
                  src={each.image_url}
                  alt="image"
                />
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}
