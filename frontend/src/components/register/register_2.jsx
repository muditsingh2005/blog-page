// import { useState } from "react";
// import axios from "axios";

// export default function Register_2({ formData, setFormData }) {
//   const [username, setUsername] = useState(formData.username || "");
//   const [fullName, setFullName] = useState(formData.fullName || "");
//   const [bio, setBio] = useState(formData.bio || "");
//   const [avatar, setavatar] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Merge new data with previous formData
//     const updatedData = { ...formData, username, fullName, bio, avatar };
//     setFormData(updatedData);

//     // Create FormData object for sending files
//     const formDataToSend = new FormData();
//     formDataToSend.append("email", updatedData.email);
//     formDataToSend.append("password", updatedData.password);
//     formDataToSend.append("username", updatedData.username);
//     formDataToSend.append("fullName", updatedData.fullName);
//     formDataToSend.append("bio", updatedData.bio);
//     if (updatedData.avatar) {
//       formDataToSend.append("avatar", updatedData.avatar); // profile picture file
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5252/api/v1/users/register", // replace with your backend endpoint
//         formDataToSend,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       console.log("User registered successfully:", response.data);
//       alert("Registration successful!");
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Bio"
//         value={bio}
//         onChange={(e) => setBio(e.target.value)}
//       ></textarea>
//       <input type="file" onChange={(e) => setavatar(e.target.files[0])} />
//       <button type="submit">Register</button>
//     </form>
//   );
// }

import { useState } from "react";
import axios from "axios";

export default function Register_2({ formData, setFormData }) {
  const [username, setUsername] = useState(formData.username || "");
  const [fullName, setFullName] = useState(formData.fullName || "");
  const [bio, setBio] = useState(formData.bio || "");
  const [avatar, setavatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...formData, username, fullName, bio, avatar };
    console.log("Final Registration Data:", updatedData);

    // Save it in the main form state
    setFormData(updatedData);

    // // Prepare FormData for file + text
    // const formDataToSend = new FormData();
    // formDataToSend.append("email", updatedData.email);
    // formDataToSend.append("password", updatedData.password);
    // formDataToSend.append("username", updatedData.username);
    // formDataToSend.append("fullName", updatedData.fullName);
    // formDataToSend.append("bio", updatedData.bio);
    // if (updatedData.avatar) {
    //   formDataToSend.append("avatar", updatedData.avatar);
    // }
    const form = new FormData();
    for (let key in updatedData) {
      form.append(key, updatedData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5252/api/v1/users/register", // your backend endpoint
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Response from backend:", res.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error sending registration:", error);
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
      <input type="file" onChange={(e) => setavatar(e.target.files[0])} />
      <button type="submit">Register</button>
    </form>
  );
}
