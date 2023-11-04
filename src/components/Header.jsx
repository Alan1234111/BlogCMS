import {StyledHeader} from "./styles/Header.styled";
import {Link, NavLink} from "react-router-dom";

export default function Header() {
  const activeStyles = {
    borderBottom: "black solid 1px",
  };

  return (
    <StyledHeader>
      <div>
        <h1>Blogly CMS</h1>
        <NavLink to="/" style={({isActive}) => (isActive ? activeStyles : null)}>
          Home
        </NavLink>
        <NavLink to="/newpost" style={({isActive}) => (isActive ? activeStyles : null)}>
          New Post
        </NavLink>
      </div>
      <Link to="/login" className="login">
        Log in
      </Link>
    </StyledHeader>
  );
}
