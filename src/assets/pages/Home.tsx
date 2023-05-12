import React from "react";
import { Col } from "antd";
import ListPokes from "../../components/ListPokes";
import SearchBar from "../../components/SearchBar";

const Home = () => {
  return (
    <Col span={24} className="bg-main h-[100%]">
      <SearchBar/>
      <ListPokes/>
    </Col>
  );
};

export default Home;
