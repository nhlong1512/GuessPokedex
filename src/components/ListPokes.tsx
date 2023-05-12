import { Col } from "antd";
import React from "react";
import { PokemonDetail } from "../model/model";
import PokeCard from "./PokeCard";

interface Props {
  listPokemons: PokemonDetail[];
}

const ListPokes:React.FC<Props> = ({listPokemons}) => {
  console.log(listPokemons);
  
  return (
    <Col
      span={22}
      offset={1}
      className="bg-[#fff] w-full flex mt-[40px] rounded-xl py-[40px] px-[10px] flex-wrap gap-[20px] justify-evenly"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px -10px -20px, rgba(0, 0, 0, 0.23) 0px -6px -6px",
      }}
    >
      {listPokemons.map((item:PokemonDetail) =>(
        <PokeCard key={item.id} pokemonDetail = {item}/>
      ))}
    </Col>
  );
};

export default ListPokes;
