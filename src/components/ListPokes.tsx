import { Col } from "antd";
import React from "react";
import PokeCard from "./PokeCard";

const ListPokes = () => {
  return (
    <Col
      span={22}
      offset={1}
      className="bg-[#fff] w-full h-[400px] flex mt-[40px] rounded-xl py-[40px] px-[10px] flex-wrap gap-[20px] justify-evenly"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px -10px -20px, rgba(0, 0, 0, 0.23) 0px -6px -6px",
      }}
    >
      <PokeCard />
      <PokeCard />
      <PokeCard />
      <PokeCard />
      <PokeCard />
    </Col>
  );
};

export default ListPokes;
