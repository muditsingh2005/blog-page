import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const accessToken =
          localStorage.getItem("accessToken") || localStorage.getItem("token");

        await axios.post(
          "http://localhost:5252/api/v1/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.setItem("loggedIn", "false");

        navigate("/login"); // Redirect to login page after logout
      } catch (error) {
        console.error("Logout failed:", error);
        // Optionally, handle error state or redirect to a different page
        // navigate("/login"); // Still redirect even if logout fails on server
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
