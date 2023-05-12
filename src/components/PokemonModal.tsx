import React, { useState } from "react";

import { Col, Divider, Modal, Progress } from "antd";
import Bulbasaur from "../assets/images/Bulbasaur.png";
import { PokemonDetail } from "../model/model";
import ArrowBack from "../assets/icons/arrow_back.svg";
import weight from "../assets/icons/weight.png";
import straighten from "../assets/icons/straighten.png";

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
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      closeIcon={undefined}
      closable={false}
      width={420}
      centered={true}
    >
      <div className="bg-[#74cb48] py-[20px] px-[24px] relative flex flex-col rounded-[8px]">
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
          <div className="py-[4px] px-[10px] rounded-[20px] text-[#fff] text-[12px] font-[500] bg-[#74cb48] mt-[10px]">
            Grass
          </div>
          <h3 className="text-[16px] font-[500] text-[#74cb48] mt-[10px]">
            About
          </h3>
          <div className="flex justify-between gap-[80px]">
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center">
                <img src={weight} alt="weight" className="w-[14px] h-[14px]" />
                <p className="ml-[12px] text-[14px] my-0 font-[500]">8.5 kg</p>
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
                <p className="ml-[12px] text-[14px] my-0 font-[500]">0.6m</p>
              </div>
              <p className="text-[12px] text-[#666] text-center font-[500] mb-0 my-[12px]">
                Height
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center">
                <p className="text-[14px] my-0 font-[500]">Overgrow</p>
              </div>
              <p className="text-[12px] text-[#666] text-center font-[500] mb-0 my-[12px]">
                Moves
              </p>
            </div>
          </div>
          <p className="desc text-[14px] leading-[20px] font-[400]">
            {`It can go for days\nwithout eating a\nsingle morsel.\fIn the bulb on\nits back, it\nstores energy.`}
          </p>
          <h3 className="text-[16px] font-[500] text-[#74cb48] mt-[10px] text-center">
            Base Stats
          </h3>
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <h3 className="m-0 text-[14px] font-[500] text-[#74cb48]">
                  HP
                </h3>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  045
                </p>
                <Progress
                  percent={50}
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={"#74cb48"}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <h3 className="m-0 text-[14px] font-[500] text-[#74cb48]">
                  HP
                </h3>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  045
                </p>
                <Progress
                  percent={50}
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={"#74cb48"}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <h3 className="m-0 text-[14px] font-[500] text-[#74cb48]">
                  HP
                </h3>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  045
                </p>
                <Progress
                  percent={50}
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={"#74cb48"}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <h3 className="m-0 text-[14px] font-[500] text-[#74cb48]">
                  HP
                </h3>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  045
                </p>
                <Progress
                  percent={50}
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={"#74cb48"}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <h3 className="m-0 text-[14px] font-[500] text-[#74cb48]">
                  HP
                </h3>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  045
                </p>
                <Progress
                  percent={50}
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={"#74cb48"}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-start items-center">
                <h3 className="m-0 text-[14px] font-[500] text-[#74cb48]">
                  HP
                </h3>
                <p className="m-0 ml-[30px] text-[12px] font-[500] mr-[10px]">
                  045
                </p>
                <Progress
                  percent={50}
                  showInfo={false}
                  className="mb-[5px]"
                  strokeColor={"#74cb48"}
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
