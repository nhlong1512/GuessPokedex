import React from "react";
import { Col } from "antd";
import Bulbasaur from "../assets/images/Bulbasaur.png";
import { PokemonDetail } from "../model/model";


interface Prop {
  pokemonDetail: PokemonDetail;
}

const PokeCard:React.FC<Prop> = ({pokemonDetail}) => {
  return (
    <Col span={4} className="">
      <Col
        className="relative flex justify-center flex-col items-center bg-[#fff] rounded-xl p-[16px]"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
      >
        <div className="flex justify-end items-end w-full mr-[20px]">
          <p className="text-[#666666] text-[14px] leading-[20px] my-0 flex justify-end items-end font-[500]">
            #{pokemonDetail.id < 10 ? `00${pokemonDetail.id}` : pokemonDetail.id < 100 ? `0${pokemonDetail.id}` : pokemonDetail.id}
          </p>
        </div>
        <div className="bg-[#efefef] absolute h-[100px] w-full rounded-xl bottom-0"></div>
        <img src={pokemonDetail.sprites.front_default} alt="bulbasaur" className="w-[126px] h-[126px] resize-contain z-[1]"/>
        <h3 className="text-[#1D1D1D] text-[20px] leading-[28px] font-[400] my-[8px] z-[1] uppercase">
          {pokemonDetail.name}
        </h3>
      </Col>
    </Col>
  );
};

export default PokeCard;
