import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser, signOut } from "../features/userSlice";
import { auth } from "../firebaseConfig";
import Footer from "./Footer";
import NavBar from "./NavBar";

const NavBarWrapper:React.FC = () => {
  
  return (
    <div className="bg-main h-full min-h-[100vh]">
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default NavBarWrapper;

