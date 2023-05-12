import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PlayGame from "./pages/PlayGame";
import NavBarWrapper from "./components/NavBarWrapper";

const App = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<NavBarWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<PlayGame />} />
      </Route>
    </Routes>
  );
};

export default App;
