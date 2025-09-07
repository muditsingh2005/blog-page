import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const getUserProfile = (e) => {
    e.preventDefault();
    navigate("/user-profile");
  };

  return (
    <div>
      <h1>Welcome Home!</h1>
      <p>You are now logged in.</p>
      <button onClick={getUserProfile}>user profile</button>
    </div>
  );
}

export default Home;
