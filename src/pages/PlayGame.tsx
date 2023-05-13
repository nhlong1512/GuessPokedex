import { Col, Progress } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api";
import { PokemonDetail, PokemonSpecies, pokemonTypes } from "../model/model";
import weight from "../assets/icons/weight.png";
import straighten from "../assets/icons/straighten.png";
import ResultCodeField from "../components/ResultCodeField";
// import OtpInput from "react-otp-input";

const PlayGame: React.FC = () => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();
  const [type, setType] = useState<string>("fire");

  const fetchPokemonDetail = async () => {
    const res = await api.get(`pokemon/3`);
    let poke: PokemonDetail = res.data;
    setPokemonDetail(poke);
    setType(poke.types[0].type.name);
    fetchSpecies(poke);
  };
  useEffect(() => {
    fetchPokemonDetail();
  }, []);

  const [colorPoke, setColorPoke] = useState<string>("");
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();

  useEffect(() => {
    pokemonTypes.forEach((p) => {
      if (p.name === type) {
        setColorPoke(p.color);
        return;
      }
    });
  }, [type]);

  const fetchSpecies = async (poke: PokemonDetail) => {
    const res = await api.get(`pokemon-species/${poke.id}`);
    let pokemonSpecies: PokemonSpecies = res.data;
    setPokemonSpecies(pokemonSpecies);
  };

  //Result game
  const [OTP, setOTP] = useState<string>("");
  // const onChangeResult = (value: string) => setOtp(value);

  return (
    <Col
      span={22}
      offset={1}
      className="bg-[#fff] flex rounded-xl py-[20px] px-[10px] flex-col items-center"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px -10px -20px, rgba(0, 0, 0, 0.23) 0px -6px -6px",
      }}
    >
      <div
        className="py-[20px] px-[24px] relative flex flex-col rounded-[8px]"
        style={{ backgroundColor: colorPoke }}
      >
        <div className="bg-[#efefef] absolute h-[67%] left-[6px] right-[6px] rounded-md bottom-[6px]"></div>
        <div className="flex flex-col justify-center items-center z-[1001]">
          <img
            src={
              pokemonDetail?.sprites.front_default
                ? pokemonDetail?.sprites.front_default
                : ""
            }
            alt="pokemon"
            className="flex justify-center h-[50%] w-[50%] mt-[-10px]"
          />
          <div
            className="py-[4px] px-[10px] rounded-[20px] text-[#fff] text-[12px] font-[500] capitalize mt-0"
            style={{ backgroundColor: colorPoke }}
          >
            {pokemonDetail?.types[0].type.name
              ? pokemonDetail?.types[0].type.name
              : ""}
          </div>
          <h3
            className="text-[16px] font-[500] mt-0 mb-[10px]"
            style={{ color: colorPoke }}
          >
            About
          </h3>
          <div className="flex justify-between gap-[80px]">
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center">
                <img src={weight} alt="weight" className="w-[14px] h-[14px]" />
                <p className="ml-[12px] text-[14px] my-0 font-[500]">
                  {pokemonDetail?.weight ? pokemonDetail?.weight : 0}kg
                </p>
              </div>
              <p className="text-[12px] text-[#666] text-center font-[500] mb-0 my-[12px]">
                Weight
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center">
                <img
                  src={straighten}
                  alt="height"
                  className="w-[14px] h-[14px]"
                  style={{ transform: "rotate(90deg)" }}
                />
                <p className="ml-[12px] text-[14px] my-0 font-[500]">
                  {(pokemonDetail?.height ? pokemonDetail?.height : 0) / 10}m
                </p>
              </div>
              <p className="text-[12px] text-[#666] text-center font-[500] mb-0 my-[12px]">
                Height
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center">
                <p className="text-[14px] my-0 font-[500] capitalize">
                  {pokemonDetail?.moves[0].move.name
                    ? pokemonDetail?.moves[0].move.name
                    : ""}
                </p>
              </div>
              <p className="text-[12px] text-[#666] text-center font-[500] mb-0 my-[12px]">
                Moves
              </p>
            </div>
          </div>
          {/* <p className="desc text-[14px] leading-[20px] font-[500]">
            {pokemonSpecies?.flavor_text_entries[0].flavor_text.replace(
              /\f/g,
              ""
            )}
          </p> */}
          <h3
            className="text-[16px] font-[500] mb-[10px] text-center mt-0"
            style={{ color: colorPoke }}
          >
            Base Stats
          </h3>
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <Col span={2}>
                  <h3
                    className="m-0 text-[14px] font-[500]"
                    style={{ color: colorPoke }}
                  >
                    HP
                  </h3>
                </Col>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  {pokemonDetail?.stats[0].base_stat
                    ? pokemonDetail?.stats[0].base_stat
                    : 0 < 100
                    ? `0${
                        pokemonDetail?.stats[0].base_stat
                          ? pokemonDetail?.stats[0].base_stat
                          : 0
                      }`
                    : pokemonDetail?.stats[0].base_stat
                    ? pokemonDetail?.stats[0].base_stat
                    : 0}
                </p>
                <Progress
                  percent={
                    ((pokemonDetail?.stats[0].base_stat
                      ? pokemonDetail?.stats[0].base_stat
                      : 0) *
                      1) /
                    2
                  }
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={colorPoke}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <Col span={2}>
                  <h3
                    className="m-0 text-[14px] font-[500]"
                    style={{ color: colorPoke }}
                  >
                    ATK
                  </h3>
                </Col>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  {(pokemonDetail?.stats[1].base_stat
                    ? pokemonDetail?.stats[1].base_stat
                    : 0) < 100
                    ? `0${
                        pokemonDetail?.stats[1].base_stat
                          ? pokemonDetail?.stats[1].base_stat
                          : 0
                      }`
                    : pokemonDetail?.stats[1].base_stat
                    ? pokemonDetail?.stats[1].base_stat
                    : 0}
                </p>
                <Progress
                  percent={
                    ((pokemonDetail?.stats[1].base_stat
                      ? pokemonDetail?.stats[1].base_stat
                      : 0) *
                      1) /
                    2
                  }
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={`${colorPoke}`}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <Col span={2}>
                  <h3
                    className="m-0 text-[14px] font-[500]"
                    style={{ color: colorPoke }}
                  >
                    DEF
                  </h3>
                </Col>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  {(pokemonDetail?.stats[2].base_stat
                    ? pokemonDetail?.stats[2].base_stat
                    : 0) < 100
                    ? `0${
                        pokemonDetail?.stats[2].base_stat
                          ? pokemonDetail?.stats[2].base_stat
                          : 0
                      }`
                    : pokemonDetail?.stats[2].base_stat
                    ? pokemonDetail?.stats[2].base_stat
                    : 0}
                </p>
                <Progress
                  percent={
                    ((pokemonDetail?.stats[2].base_stat
                      ? pokemonDetail?.stats[2].base_stat
                      : 0) *
                      1) /
                    2
                  }
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={`${colorPoke}`}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <Col span={2}>
                  <h3
                    className="m-0 text-[14px] font-[500]"
                    style={{ color: colorPoke }}
                  >
                    SATK
                  </h3>
                </Col>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  {(pokemonDetail?.stats[3].base_stat
                    ? pokemonDetail?.stats[3].base_stat
                    : 0) < 100
                    ? `0${
                        pokemonDetail?.stats[3].base_stat
                          ? pokemonDetail?.stats[3].base_stat
                          : 0
                      }`
                    : pokemonDetail?.stats[3].base_stat}
                </p>
                <Progress
                  percent={
                    ((pokemonDetail?.stats[3].base_stat
                      ? pokemonDetail?.stats[3].base_stat
                      : 0) *
                      1) /
                    2
                  }
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={`${colorPoke}`}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <Col span={2}>
                  <h3
                    className="m-0 text-[14px] font-[500]"
                    style={{ color: colorPoke }}
                  >
                    SDEF
                  </h3>
                </Col>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  {(pokemonDetail?.stats[4].base_stat
                    ? pokemonDetail?.stats[4].base_stat
                    : 0) < 100
                    ? `0${
                        pokemonDetail?.stats[4].base_stat
                          ? pokemonDetail?.stats[4].base_stat
                          : 0
                      }`
                    : pokemonDetail?.stats[4].base_stat}
                </p>
                <Progress
                  percent={
                    ((pokemonDetail?.stats[4].base_stat
                      ? pokemonDetail?.stats[4].base_stat
                      : 0) *
                      1) /
                    2
                  }
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={`${colorPoke}`}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <Col span={2}>
                  <h3
                    className="m-0 text-[14px] font-[500]"
                    style={{ color: colorPoke }}
                  >
                    SPD
                  </h3>
                </Col>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  {(pokemonDetail?.stats[5].base_stat
                    ? pokemonDetail?.stats[5].base_stat
                    : 0) < 100
                    ? `0${
                        pokemonDetail?.stats[5].base_stat
                          ? pokemonDetail?.stats[5].base_stat
                          : 0
                      }`
                    : pokemonDetail?.stats[5].base_stat}
                </p>
                <Progress
                  percent={
                    ((pokemonDetail?.stats[5].base_stat
                      ? pokemonDetail?.stats[5].base_stat
                      : 0) *
                      1) /
                    2
                  }
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={`${colorPoke}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[40px]">
        {/* <ResultCodeField
          value={otp}
          valueLength={20}
          onChangeResult={onChangeResult}
        /> */}
      </div>
    </Col>
  );
};

export default PlayGame;
