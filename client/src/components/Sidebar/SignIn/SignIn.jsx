import React from "react";
import ".//SignIn.css";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FBAPPID } from "../../../securitykeys";

function SignIn({
  signIn,
  handleSignInOpen,
  handleOnSignInFormChange,
  handleOnSignInSubmit,
  signinerror,
  handleFacebookLoginResponse,
}) {
  return (
    <div className="signIn">
      <form className="signin-form">
        <button className="back-button" onClick={() => handleSignInOpen()}>
          {" "}
          &rarr;
        </button>
        <h1>Sign In</h1>
        {signinerror ? <p className="error">{signinerror}</p> : null}
        <div className="fblogin">
          <h3>Sign in with Facebook by clicking on the icon.</h3>
          <FacebookLogin
            appId={FBAPPID}
            fields="email, name"
            callback={handleFacebookLoginResponse}
            render={(renderProps) => (
              <div className="login-social-item login-social-item--facebook">
                <img
                  onClick={renderProps.onClick}
                  className="login-social-item__image"
                  src={
                    "https://findicons.com/files/icons/2830/clean_social_icons/250/facebook.png"
                  }
                  alt=""
                />
              </div>
            )}
          />
        </div>

        <div className="signin-form-inputs">
          <h2 className="noMarginTop">E-mail</h2>
          <input
            type="email"
            name="email"
            placeholder="e.g. drainpal@drainpal.com"
            className="sign-in-input"
            value={signIn.email}
            onChange={(e) => {
              handleOnSignInFormChange("email", e.target.value);
            }}
          />

          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="sign-in-input"
            value={signIn.password}
            onChange={(e) => {
              handleOnSignInFormChange("password", e.target.value);
            }}
          />

          <button
            className="sign-in-button"
            type="button"
            onClick={() => handleOnSignInSubmit(signIn)}
          >
            {" "}
            Sign In{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
