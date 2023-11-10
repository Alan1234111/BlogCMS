import {useState} from "react";
import {StyledLogin} from "../components/styles/Login.styled";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext";

export default function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Call the login function from the context, passing the form data
      await login(event, formData);

      // If login is successful, navigate to the desired location (e.g., "/")
      navigate("/");
    } catch (err) {
      // Handle login error, e.g., display an error message
      console.error("Login failed", err);
    }
  };

  return (
    <StyledLogin>
      <h2>Login</h2>
      <form method="POST" onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </StyledLogin>
  );
}
