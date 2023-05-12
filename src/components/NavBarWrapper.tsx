import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const NavBarWrapper = () => {
  return (
    <div className="bg-main">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default NavBarWrapper;