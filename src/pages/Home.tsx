import React, { useEffect, useState } from "react";
import { Button, Col, ConfigProvider } from "antd";
import ListPokes from "../components/ListPokes";
import SearchBar from "../components/SearchBar";
import api from "../api";
import { PokemonDetail, Pokemon } from "../model/model";

const URL_POKEMON = "/pokemon?limit=20&offset=0";
const Home: React.FC = () => {
  //StateManager
  const [listPokemons, setListPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextUrl, setNextUrl] = useState<string>("");

  const fetchPokemonList = async (url: string) => {
    setLoading(true);
    const res = await api.get(url);
    setNextUrl(res.data.next);
    let pokemons = res.data.results;
    pokemons.forEach(async (pokemon: Pokemon) => {
      const poke = await api.get(pokemon.url);
      setListPokemons((listPokemons) => {
        const sortedList = [...listPokemons, poke.data].sort((a, b) => a.id - b.id);
        return sortedList;
      });
      // setListPokemons((listPokemons) => [...listPokemons, poke.data]);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchPokemonList(URL_POKEMON);
  }, []);
  console.log(listPokemons);

  const handleLoadMore = () => {
    fetchPokemonList(nextUrl);
  };

  return (
    <Col span={24} className="bg-main h-[100%]">
      <SearchBar />
      <Col
        span={22}
        offset={1}
        className="bg-[#fff] flex mt-[40px] rounded-xl py-[10px] px-[10px] flex-col items-center"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px -10px -20px, rgba(0, 0, 0, 0.23) 0px -6px -6px",
        }}
      >
        <ListPokes
          listPokemons={listPokemons}
          loading={loading}
          setLoading={setLoading}
        />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#dc0a2d",
            },
          }}
        >
          <Button
            type="primary"
            disabled={loading}
            className="py-[10px] px-[20px] text-gray-900 text-[20px] rounded-[16px] my-[20px] leading-[2rem] h-auto font-[700]"
            onClick={handleLoadMore}
          >
            {loading ? `Loading` : `Load More...`}
          </Button>
        </ConfigProvider>
      </Col>
    </Col>
  );
};

export default Home;
