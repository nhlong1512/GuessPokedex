import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PlayGame from "./pages/PlayGame";
import NavBarWrapper from "./components/NavBarWrapper";
import { auth } from "./firebaseConfig";
import { setUser, signOut } from "./features/userSlice";
import Profile from "./pages/Profile";
import { useAppDispatch } from "./app/hook";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        //Logged in
        dispatch(setUser(user))
        // navigate("/");
        return;
      } else {
        //Logged out
        dispatch(signOut());
        navigate("/sign-in");
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<NavBarWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<PlayGame />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
