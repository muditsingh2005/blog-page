import { useNavigate } from "react-router-dom";
import CreatePost from "../createPost/createPost.jsx";

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
      {/* <button onClick={createPostHandller}>New Post</button> */}
      <CreatePost />
    </div>
  );
}

export default Home;
