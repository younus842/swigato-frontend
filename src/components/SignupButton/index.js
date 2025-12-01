import React from "react";
import "./index.css";
const SignupButton = (props) => {
  const { signup, boolean } = props;
  const triggerButton = () => {
    signup();
  };


  return (
    <>
      {boolean ? (
        <div className="d-flex signup-container">
          <p className="para-signup">New here?</p>
          <button
            className="signup-button"
            type="button"
            onClick={triggerButton}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="d-flex signup-container">
          <p className="para-signup">Already have an account?</p>
          <button
            className="signup-button"
            type="button"
            onClick={triggerButton}
          >
            Log In
          </button>
        </div>
      )}
    </>
  );
};

export default SignupButton;
