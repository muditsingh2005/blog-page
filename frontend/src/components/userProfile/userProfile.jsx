import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5252/api/v1/users/current-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.data); // Adjust if your response structure differs
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Full Name:</strong> {user.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio}
      </p>
      <img src={user.avatar} alt="Avatar" width={100} />
    </div>
  );
}

export default UserProfile;
