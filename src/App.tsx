import React from "react";
import "./App.css";
import { Button } from "antd";
import NavBar from "./components/NavBar";
import Home from "./assets/pages/Home";

const App = () => {
  return (
    <div className="App bg-main">
      <NavBar />
      <Home />
    </div>
  );
};

export default App;
