import { StyledHeader } from "./styles/Header.styled";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const activeStyles = {
    borderBottom: "black solid 1px",
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  };
  return (
    <StyledHeader>
      <div>
        <h1>Blogly CMS</h1>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>
        <NavLink
          to="/newpost"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          New Post
        </NavLink>
      </div>

      {token ? (
        <Link to="#" onClick={logout} className="login">
          Log out
        </Link>
      ) : (
        <Link to="/login" className="login">
          Log in
        </Link>
      )}
    </StyledHeader>
  );
}
