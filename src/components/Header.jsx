import {StyledHeader} from "./styles/Header.styled";
import {Link, NavLink} from "react-router-dom";
import {useAuth} from "./AuthContext";

export default function Header() {
  const {authenticated, logout} = useAuth();

  const activeStyles = {
    borderBottom: "black solid 1px",
  };

  return (
    <StyledHeader>
      <div>
        <h1>Blogly CMS</h1>
        {authenticated && (
          <>
            <NavLink to="/" style={({isActive}) => (isActive ? activeStyles : null)}>
              Home
            </NavLink>
            <NavLink to="/newpost" style={({isActive}) => (isActive ? activeStyles : null)}>
              New Post
            </NavLink>
          </>
        )}
      </div>

      {authenticated ? (
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
