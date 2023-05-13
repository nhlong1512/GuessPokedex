import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { signIn, signOut } from "../features/userSlice";
import { auth } from "../firebaseConfig";
import Footer from "./Footer";
import NavBar from "./NavBar";

const NavBarWrapper:React.FC = () => {
  
  return (
    <div className="bg-main h-full">
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default NavBarWrapper;

