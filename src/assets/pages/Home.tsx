import { Col } from "antd";
import React from "react";
import NavBar from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";

const Home = () => {
  return (
    <Col span={24} className="bg-main min-h-screen">
      <SearchBar/>
    </Col>
  );
};

export default Home;
