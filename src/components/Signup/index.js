import { useState, useEffect } from "react";
import "./index.css";
import SignupButton from "../SignupButton";
import Image2 from "../../assets/logo-restaurant.png";
import Loader from "../Loader";

const Signup = (props) => {
  const { signup } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [check, handleChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name != "" && email != "" && password != "") {
      handleChecked(true);
    } else {
      handleChecked(false);
    }
  });

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (name == "" || email == "" || password == "") {
      return;
    }

    const userDetails = {
      name,
      email,
      password,
    };

    const response = await fetch(
      "https://swigato-backend-5.onrender.com/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setSuccessMsg("");
      setErrorMsg(data.message || "Signup failed");
      setLoading(false);
    } else {
      setErrorMsg("");
      setSuccessMsg("Signup successful!");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <form className="form-container signup-card mb-4" onSubmit={handleSignup}>
      <div className="header-logo-container mb-4">
        <img
          className="website-image-logo d-none d-md-block"
          src={Image2}
          alt="website logo"
        />
        <p className="swigato-2 d-md-block d-none">Swigato</p>
      </div>
      {successMsg !== "Signup successful!" ? (
        <>
          <div className="input-container">
            <label className="input-label" htmlFor="signup-name">
              NAME
            </label>
            <input
              id="signup-name"
              type="text"
              className="username-input-field"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="signup-email">
              EMAIL
            </label>
            <input
              id="signup-email"
              type="email"
              className="username-input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="signup-password">
              PASSWORD
            </label>
            <input
              id="signup-password"
              type="password"
              className="password-input-field"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {loading ? (
            <Loader login = {true}/>
          ) : (
            <>
              {check ? (
                <button type="submit" className="login-button">
                  Sign Up
                </button>
              ) : (
                <p className="login-button login-button34 text-center">
                  Sign Up
                </p>
              )}
              <SignupButton boolean={false} signup={signup} />
            </>
          )}
        </>
      ) : (
        successMsg && (
          <>
            <p className="success-message">{successMsg}</p>
            <div className="d-flex align-items-center">
              <button
                className="signup-button button-success"
                type="button"
                onClick={signup}
              >
                Click Here
              </button>
              <p className="para-signup">to Log In</p>
            </div>
          </>
        )
      )}

      {!loading && errorMsg && <p className="error-message">*{errorMsg}</p>}
    </form>
  );
};

export default Signup;
