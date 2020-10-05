import { Button } from "@material-ui/core";
import React from "react";
import "../assets/css/Login.css";
import { auth, provider } from "../config/firebase";
import { useStateValue } from "../StateProvider";

function Login() {
  const [{ rooms, user }, dispatch] = useStateValue();

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((auth) =>
        dispatch({
          type: "SET_USER",
          payload: {
            user: auth.user,
          },
        })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt="whatsapp"
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
