import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";

function App() {
  return (
    <div className="App">
      Hello There
      <h1 className="text-3xl text-red-600 font-bold underline">
        Hello world!
      </h1>
      <Button type="dashed" className="bg-red-500">Dashed Button</Button>
    </div>
  );
}

export default App;
