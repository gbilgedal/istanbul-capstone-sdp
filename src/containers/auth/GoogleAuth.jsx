import React from "react";
import googleIcon from "../../images/googleIcon.png";
import { connect } from "react-redux";
import { googleAuth } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import "./index.css";

const GoogleAuth = (props) => {
  const { authError, errMessage, auth, errKey } = props;
  // Redirect to home page after the auth is done and signed in
  if (auth.uid) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <img
        alt="google-icon"
        className="auth-icon"
        src={googleIcon}
        onClick={props.googleAuth}
      />
      {authError && errKey ? (
        <>
          <br />
          <p>
            <b>{authError}</b>
          </p>
          <p>
            <b>Hint: </b>
            {errMessage}
          </p>
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    errMessage: state.auth.errMessage,
    errKey: state.auth.errKey,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    googleAuth: () => dispatch(googleAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);