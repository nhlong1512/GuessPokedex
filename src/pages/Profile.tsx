import { Button, Col, ConfigProvider, Divider, Input, Row } from "antd";
import { log } from "console";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import thumbnail from "../assets/images/Thumbnail.svg";
import userImg from "../assets/images/user.png";
import { User } from "../model/model";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user:User | null = useAppSelector(state => state.user.currentUser)
  console.log(user);
  
  return (
    <Col span={24} className="bg-[#fff] py-[48px]">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#dc0a2d",
          },
        }}
      >
        <Col span={18} offset={3} className="mt-[40px] mb-[40px]">
          <Row className="mt-[40px] flex items-center justify-between">
            <div className="flex items-center gap-[40px]">
              <img
                src={user?.photoURL ? user.photoURL : userImg}
                alt="userImg"
                className="h-[160px] w-[160px] rounded-[100px] object-cover cursor-pointer"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              />
              <div>
                <h3 className="text-[24px] my-0">Profile</h3>
                <p className="my-0">Update your photo and personal details.</p>
              </div>
            </div>
            <Button
              type="primary"
              className="px-[10px] py-[6px] rouneded-[8px] flex items-center"
            >
              <p className="my-0 text-[16px] font-[700]">Save</p>
            </Button>
          </Row>
          <Row className="flex w-full mt-[40px]">
            <Row className="flex w-full items-center">
              <Col span={6}>
                <h3 className="text-[16px] my-0">Your Name</h3>
              </Col>
              <Col span={18}>
                <Input
                  size="large"
                  placeholder="Full Name"
                  type="text"
                  name="fullName"
                  value={user?.fullName? user.fullName : ''}
                  // onChange={handleChange}
                  className="font-[500] px-[8px] py-[10px] rounded-[4px] min-w-[300px]"
                />
              </Col>
            </Row>
            <Divider />
            <Row className="flex w-full items-center">
              <Col span={6}>
                <h3 className="text-[16px] my-0">Your Email</h3>
              </Col>
              <Col span={18}>
                <Input
                  size="large"
                  placeholder="Your email"
                  type="text"
                  name="email"
                  value={user?.email ? user.email : ''}
                  disabled
                  // onChange={handleChange}
                  className="font-[500] px-[8px] py-[10px] rounded-[4px] min-w-[300px]"
                />
              </Col>
            </Row>
            <Divider />
            <Row className="flex w-full items-center">
              <Col span={6}>
                <h3 className="text-[16px] my-0">Your Phone</h3>
              </Col>
              <Col span={18}>
                <Input
                  size="large"
                  placeholder="Your phone"
                  type="number"
                  name="phone"
                  value = {user?.phoneNumber ? user.phoneNumber : ''}
                  // onChange={handleChange}
                  className="font-[500] px-[8px] py-[10px] rounded-[4px] min-w-[300px]"
                />
              </Col>
            </Row>
          </Row>
        </Col>
      </ConfigProvider>
    </Col>
  );
};

export default Profile;
