import React, { useEffect, useState } from "react";
import { Col } from "antd";
import ListPokes from "../../components/ListPokes";
import SearchBar from "../../components/SearchBar";
import api from "../../api";
import { PokemonDetail, Pokemon } from "../../model/model";

const URL_POKEMON = "/pokemon?limit=20&offset=0";
const Home: React.FC = () => {
  //StateManager
  const [listPokemons, setListPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [nextUrl, setNextUrl] = useState<string>();

  const fetchPokemonList = async (url:string) => {
    setLoading(true);
    const res = await api.get(url);
    setNextUrl(res.data.next);
    console.log(res.data.results);
    let pokemons = res.data.results;
    pokemons.forEach(async (pokemon: Pokemon) => {
      const poke = await api.get(pokemon.url);
      const pokemonDetail: PokemonDetail = poke.data;
      console.log(pokemonDetail);
      setListPokemons((listPokemons) => [...listPokemons, poke.data]);
      setLoading(false)
    });
    console.log(listPokemons);
  };
  useEffect(() => {
    fetchPokemonList(URL_POKEMON);
  }, []);

  return (
    <Col span={24} className="bg-main h-[100%]">
      <SearchBar />
      <ListPokes listPokemons={listPokemons} />
    </Col>
  );
};

export default Home;
