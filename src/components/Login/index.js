import { Component } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/login-image.jpg";
import Image2 from "../../assets/logo-restaurant.png";
import "./index.css";
import Signup from "../Signup";
import SignupButton from "../SignupButton";
import Loader from "../Loader";

function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    login: true,
    loading: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = () => {
    Cookies.set(
      "jwt_token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYW5lZXRoYSIsInJvbGUiOiJQUklNRV9VU0VSIiwiaWF0IjoxNjIzMDY1NTMyfQ.68FuDFraHW7GplQiXVUrnsU1goYgmwd0tXNk6-HxCok",
      {
        expires: 30,
      }
    );
    this.setState({ loading: false });
    this.props.navigate("/", { replace: true });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg, loading: false });
  };

  submitForm = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { username, password } = this.state;
    const userDetails = { email: username, password };
    const url2 = "https://swigato-backend-5.onrender.com/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url2, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.token);
    } else {
      this.onSubmitFailure(data.message);
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          EMAIL
        </label>
        <input
          type="email"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Email"
        />
      </>
    );
  };

  signup = () => {
    this.setState((prev) => {
      return { login: !prev.login };
    });
  };

  render() {
    const { showSubmitError, errorMsg, login, loading } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    return (
      <div className="login-form-container">
        <img src={Image} className="login-img d-md-none" alt="website login" />
        <div className="header-logo-container d-md-none small-devices-logo">
          <img className="website-image-logo" src={Image2} alt="website logo" />
          <p className="swigato d-md-none">Swigato</p>
        </div>
        <div className="login-container-top d-none d-md-block">
          <div className="login-img-2">
            {login ? (
              <form className="form-container" onSubmit={this.submitForm}>
                <div className="header-logo-container mb-4">
                  <img
                    className="website-image-logo"
                    src={Image2}
                    alt="website logo"
                  />
                  <p className="swigato-2 d-md-block d-none mb-0">Swigato</p>
                </div>
                <div className="input-container">
                  {this.renderUsernameField()}
                </div>
                <div className="input-container">
                  {this.renderPasswordField()}
                </div>
                {loading ? (
                  <Loader login = {true}/>
                ) : (
                  <>
                    <button type="submit" className="login-button">
                      Login
                    </button>
                    {showSubmitError && (
                      <p className="error-message">*{errorMsg}</p>
                    )}
                    <SignupButton signup={this.signup} boolean={true} />
                  </>
                )}
              </form>
            ) : (
              <Signup signup={this.signup} />
            )}
          </div>
        </div>
        <div className="d-md-none">
          {login ? (
            <form
              className="form-container d-md-none"
              onSubmit={this.submitForm}
            >
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              {loading ? (
                <Loader login = {true}/>
              ) : (
                <>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {showSubmitError && (
                    <p className="error-message">*{errorMsg}</p>
                  )}
                  <SignupButton signup={this.signup} boolean={true} />
                </>
              )}
            </form>
          ) : (
            <Signup signup={this.signup} />
          )}
        </div>
      </div>
    );
  }
}

export default withNavigation(LoginForm);
