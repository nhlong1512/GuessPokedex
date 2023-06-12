import React, { useEffect, useState } from "react";
import { Col, Input } from "antd";
import SearchIcon from "../assets/icons/search.svg"
import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch } from "../app/hook";
import { searchPoke } from "../features/searchPokeSlice";

const SearchBar:React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState<string>("");
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  useEffect(() => {
    dispatch(searchPoke(searchInput))
  }, [searchInput])
  if (searchInput.length > 0) {
      //Dispatch action to search

  };
  
  return (
    <Col span={20} offset={2} className="mt-[20px]">
      <div className="flex shadow-[0px_30px_60px_-12px_rgba(50, 50, 93, 0.25)]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-[40px] pointer-events-none">
          <img src={SearchIcon} alt="search" className="w-[24px] h-[24px]" />
        </div>
        <input
          type="text"
          className="text-gray-900 text-[24px] rounded-[40px] w-[100%] px-[80px] py-[14px] border-none outline-none"
          placeholder="Search"
          required
          onChange={handleChange}
        />
        {/* <Input placeholder="Search" /> */}
      </div>
    </Col>
  );
};

export default SearchBar;
