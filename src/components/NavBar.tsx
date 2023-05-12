import React, { useEffect } from "react";
import { Button, Col, ConfigProvider, Divider, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import Logo from "../assets/icons/pokeball.svg";
import userImg from "../assets/images/user.png";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { selectUser, signIn, signOut } from "../features/userSlice";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  //Authentication
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //Logged in
        dispatch(
          signIn({
            id: userAuth.uid,
            email: userAuth.email,
            fullName: userAuth.displayName,
            photoURL: userAuth.photoURL,
            phoneNumber: userAuth.phoneNumber,
          })
        );
      } else {
        //Logged out
        dispatch(signOut());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  console.log(user);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: `${user?.email}`,
    },
    {
      key: "2",
      label: `Profile`,
    },
    {
      key: "3",
      label: `Achivement`,
    },
    {
      key: "4",
      label: "Log out",
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "4") {
      auth.signOut();
      dispatch(signOut());
      navigate("/sign-in")
    }else {
      return;
    }
  };

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
        <Col span={8} className="flex justify-end items-center gap-[12px]">
          <Dropdown menu={{ items, onClick }}>
            <a
              onClick={(e) => e.preventDefault()}
              className="flex justify-end items-center"
            >
              <img
                src={userImg}
                alt="userImg"
                className="h-[50px] w-[50px] mr-[12px]"
              />
              <p className="text-[#fff] text-[14px] my-0 font-[500]">
                {user?.fullName}
              </p>
            </a>
          </Dropdown>
        </Col>
      </Col>
    </Col>
  );
};

export default NavBar;
