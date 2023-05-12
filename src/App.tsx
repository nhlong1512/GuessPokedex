import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="App bg-main min-h-screen pb-[40px]">
      <NavBar />
      <Home />
    </div>
  );
};

export default App;
