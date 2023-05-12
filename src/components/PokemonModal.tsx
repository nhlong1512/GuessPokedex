import React, { useEffect, useState } from "react";
import { Col, Divider, Modal, Progress } from "antd";
import { PokemonDetail, PokemonSpecies, pokemonTypes } from "../model/model";
import ArrowBack from "../assets/icons/arrow_back.svg";
import weight from "../assets/icons/weight.png";
import straighten from "../assets/icons/straighten.png";
import api from "../api";

interface Props {
  pokemonDetail: PokemonDetail;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PokemonModal: React.FC<Props> = ({
  pokemonDetail,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [colorPoke, setColorPoke] = useState<string>("");
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();
  const t_type: string = pokemonDetail.types[0].type.name;
  console.log(pokemonDetail);
  console.log(pokemonDetail.stats[0].base_stat);

  useEffect(() => {
    pokemonTypes.forEach((p) => {
      if (p.name === t_type) {
        setColorPoke(p.color);
        return;
      }
    });
  }, [t_type]);

  const fetchSpecies = async () => {
    const res = await api.get(`pokemon-species/${pokemonDetail.id}`);
    let pokemonSpecies: PokemonSpecies = res.data;
    setPokemonSpecies(pokemonSpecies);
  };
  useEffect(() => {
    fetchSpecies();
  }, []);

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      closeIcon={undefined}
      closable={false}
      width={440}
      centered={true}
    >
      <div
        className="py-[20px] px-[24px] relative flex flex-col rounded-[8px]"
        style={{ backgroundColor: colorPoke }}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="flex">
            <img src={ArrowBack} alt="arrow_back" />
            <h3 className="text-[#fff] text-[24px] font-[700] my-0 capitalize ml-[16px]">
              {pokemonDetail.name}
            </h3>
          </div>
          <p className="m-0 text-[#fff] text-[14px] font-[500]">
            #
            {pokemonDetail.id < 10
              ? `00${pokemonDetail.id}`
              : pokemonDetail.id < 100
              ? `0${pokemonDetail.id}`
              : pokemonDetail.id}
          </p>
        </div>
        <div className="bg-[#efefef] absolute h-[67%] left-[6px] right-[6px] rounded-md bottom-[6px]"></div>
        <div className="flex flex-col justify-center items-center z-[1001]">
          <img
            src={pokemonDetail.sprites.front_default}
            alt="pokemon"
            className="flex justify-center h-[50%] w-[50%]"
          />
          <div
            className="py-[4px] px-[10px] rounded-[20px] text-[#fff] text-[12px] font-[500] mt-[10px] capitalize"
            style={{ backgroundColor: colorPoke }}
          >
            {pokemonDetail.types[0].type.name}
          </div>
          <h3
            className="text-[16px] font-[500] mt-[10px]"
            style={{ color: colorPoke }}
          >
            About
          </h3>
          <div className="flex justify-between gap-[80px]">
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center">
                <img src={weight} alt="weight" className="w-[14px] h-[14px]" />
                <p className="ml-[12px] text-[14px] my-0 font-[500]">
                  {pokemonDetail.weight}kg
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
                  {pokemonDetail.height}m
                </p>
              </div>
              <p className="text-[12px] text-[#666] text-center font-[500] mb-0 my-[12px]">
                Height
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center">
                <p className="text-[14px] my-0 font-[500] capitalize">
                  {pokemonDetail.moves[0].move.name}
                </p>
              </div>
              <p className="text-[12px] text-[#666] text-center font-[500] mb-0 my-[12px]">
                Moves
              </p>
            </div>
          </div>
          <p className="desc text-[14px] leading-[20px] font-[500]">
            {pokemonSpecies?.flavor_text_entries[0].flavor_text.replace(
              /\f/g,
              ""
            )}
          </p>
          <h3
            className="text-[16px] font-[500] mt-[10px] text-center"
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
                  {pokemonDetail.stats[0].base_stat < 100
                    ? `0${pokemonDetail.stats[0].base_stat}`
                    : pokemonDetail.stats[0].base_stat}
                </p>
                <Progress
                  percent={pokemonDetail.stats[0].base_stat}
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
                  {pokemonDetail.stats[1].base_stat < 100
                    ? `0${pokemonDetail.stats[1].base_stat}`
                    : pokemonDetail.stats[1].base_stat}
                </p>
                <Progress
                  percent={pokemonDetail.stats[1].base_stat}
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
                  {pokemonDetail.stats[2].base_stat < 100
                    ? `0${pokemonDetail.stats[2].base_stat}`
                    : pokemonDetail.stats[2].base_stat}
                </p>
                <Progress
                  percent={pokemonDetail.stats[2].base_stat}
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
                  {pokemonDetail.stats[3].base_stat < 100
                    ? `0${pokemonDetail.stats[3].base_stat}`
                    : pokemonDetail.stats[3].base_stat}
                </p>
                <Progress
                  percent={pokemonDetail.stats[3].base_stat}
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
                  {pokemonDetail.stats[4].base_stat < 100
                    ? `0${pokemonDetail.stats[4].base_stat}`
                    : pokemonDetail.stats[4].base_stat}
                </p>
                <Progress
                  percent={pokemonDetail.stats[4].base_stat}
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
                  {pokemonDetail.stats[5].base_stat < 100
                    ? `0${pokemonDetail.stats[5].base_stat}`
                    : pokemonDetail.stats[5].base_stat}
                </p>
                <Progress
                  percent={pokemonDetail.stats[5].base_stat}
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={`${colorPoke}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PokemonModal;
