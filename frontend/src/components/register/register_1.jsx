// Step1.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register_1({ formData, setFormData }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(formData.email || "");
  const [password, setPassword] = useState(formData.password || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, email, password });
    navigate("/register_2");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Next</button>
    </form>
  );
}
