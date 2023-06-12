import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Input,
  Row,
  Upload,
  message,
} from "antd";
import { log } from "console";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import thumbnail from "../assets/images/Thumbnail.svg";
import userImg from "../assets/images/user.png";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const user: User | null = useAppSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [phoneNumberText, setPhoneNumberText] = useState<string | null | undefined>("");

  // const handleChange: UploadProps["onChange"] = (
  //   info: UploadChangeParam<UploadFile>
  // ) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
    setPhoneNumberText(e.target.value);
  };

  const handleSave = () => {
    
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
              {/*  */}
              <img
                src={user?.photoURL ? user.photoURL : userImg}
                alt="userImg"
                className="h-[160px] w-[160px] rounded-[100px] object-cover cursor-pointer"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              />
              <div>
                <h3 className="text-[28px] my-0">Profile</h3>
                <p className="my-0">Update your photo and personal details.</p>
              </div>
            </div>
            <Button
              type="primary"
              className="px-[10px] py-[6px] rouneded-[8px] flex items-center"
              onClick={handleSave}
            >
              <p className="my-0 text-[16px] font-[700]">Save</p>
            </Button>
          </Row>
          <Row className="flex w-full mt-[40px]">
            <h3 className="text-[20px] my-0 text-[#dc0a2d]">
              Your highest score: 0
            </h3>
          </Row>
          <Divider />
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
                  value={user?.displayName ? user.displayName : ""}
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
                  value={user?.email ? user.email : ""}
                  disabled
                  // onChange={handleChange}
                  className="font-[500] px-[8px] py-[10px] rounded-[4px] min-w-[300px]"
                />
              </Col>
            </Row>
            <Divider />
            {/* <Row className="flex w-full items-center">
              <Col span={6}>
                <h3 className="text-[16px] my-0">Your Phone</h3>
              </Col>
              <Col span={18}>
                <Input
                  size="large"
                  placeholder="Your phone"
                  type="number"
                  name="phone"
                  // value={user?.phoneNumber ? user.phoneNumber : ""}
                  onChange={handleChange}
                  className="font-[500] px-[8px] py-[10px] rounded-[4px] min-w-[300px]"
                />
              </Col>
            </Row> */}
          </Row>
        </Col>
      </ConfigProvider>
    </Col>
  );
};

export default Profile;
