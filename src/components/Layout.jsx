import Header from "./Header";
import GlobalStyles from "./styles/Global";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
    </>
  );
}
