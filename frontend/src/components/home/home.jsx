import { useNavigate } from "react-router-dom";
import CreatePost from "../createPost/createPost.jsx";

function Home() {
  const navigate = useNavigate();

  const getUserProfile = (e) => {
    e.preventDefault();
    navigate("/user-profile");
  };
  const getUserLoggedOut = (e) => {
    e.preventDefault();
    navigate("/logout");
  };

  return (
    <div>
      <h1>Welcome Home!</h1>
      <p>You are now logged in.</p>
      <button onClick={getUserProfile}>user profile</button>
      {/* <button onClick={createPostHandller}>New Post</button> */}
      <button onClick={getUserLoggedOut}>Logout...</button>

      <CreatePost />
    </div>
  );
}

export default Home;
