import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const NavBarWrapper:React.FC = () => {
  return (
    <div className="bg-main h-full pb-[48px]">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default NavBarWrapper;