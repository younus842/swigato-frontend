import React from "react";
import "./index.css";
import Logo from "../../assets/logo-restaurant.png";

const Footer = () => {
  return (
    <div className="footer-container d-flex flex-column align-items-center">
      <div className="logo-container-footer d-flex mb-2">
        <img src={Logo} alt="logo" className="logo-footer" />
        <h4 className="heading-footer">Swigato</h4>
      </div>
      <p className="para-footer para">
        The only thing we are serious about is food.
      </p>
    </div>
  );
};

export default Footer;
