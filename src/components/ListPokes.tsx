import { Button, Col, ConfigProvider, Modal } from "antd";
import React, { useState } from "react";
import { PokemonDetail } from "../model/model";
import PokeCard from "./PokeCard";

interface Props {
  listPokemons: PokemonDetail[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListPokes: React.FC<Props> = ({ listPokemons }) => {
  return (
    <Col
      span={24}
      className="bg-[#fff] w-full flex rounded-xl py-[40px] px-[10px] flex-wrap gap-[20px] justify-evenly"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px -10px -20px, rgba(0, 0, 0, 0.23) 0px -6px -6px",
      }}
    >
      {listPokemons.map((item: PokemonDetail) => (
          <PokeCard key={item.id} pokemonDetail={item} />
      ))}
    </Col>
  );
};

export default ListPokes;
