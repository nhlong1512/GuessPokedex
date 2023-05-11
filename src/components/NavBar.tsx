import { Button, Col, ConfigProvider } from "antd";
import React from "react";
import Logo from "../assets/icons/pokeball.svg";

const NavBar: React.FC = () => {
  return (
    <Col className="py-[20px] bg-main">
      <Col span={20} offset={2} className="flex justify-between items-center">
        <Col span={16} className="flex items-center">
          <Col className="flex">
            <img
              src={Logo}
              alt="logo"
              className="text-[#fff] w-[48px] h-[48px]"
            />
            <h3 className="text-[#fff] text-[40px] my-0 ml-[24px] font-[700]">
              Pokédex
            </h3>
          </Col>
          <Col offset={1}>
            <h3 className="text-[#fff] text-[20px] my-0 font-[500]">
              All Pokémon
            </h3>
          </Col>
          <Col offset={1}>
            <h3 className="text-[#fff] text-[20px] my-0 font-[500]">
              Play Game
            </h3>
          </Col>
          <Col offset={1}>
            <h3 className="text-[#fff] text-[20px] my-0 font-[500]">Rank</h3>
          </Col>
        </Col>
        <Col></Col>
      </Col>
    </Col>
  );
};

export default NavBar;
