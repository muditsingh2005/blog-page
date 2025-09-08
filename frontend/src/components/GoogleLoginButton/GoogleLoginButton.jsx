import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwtDecode(token); // contains email, name, picture

    try {
      // send Google token to backend
      const res = await axios.post("http://localhost:5252/api/v3/auth/google", {
        token,
      });

      // backend returns your JWT
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("loggedIn", "true");
      window.location.href = "/home"; // redirect to home
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
}
