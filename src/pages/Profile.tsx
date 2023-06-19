import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Input,
  Row,
  Upload,
  message,
  Modal,
} from "antd";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import thumbnail from "../assets/images/Thumbnail.svg";
import userImg from "../assets/images/user.png";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { User } from "../model/model";
import { setUser } from "../features/userSlice";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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
  let user: User | null = useAppSelector((state) => state.user.currentUser);
  console.log("User: ", user);
  console.log(user?.phoneNumber);
  

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [phoneNumberText, setPhoneNumberText] = useState<
    string | null | undefined
  >(user?.phoneNumber);
  useEffect(() => {
    setPhoneNumberText(user?.phoneNumber);
  }, [user?.phoneNumber]);
  console.log(phoneNumberText); 
  
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
    setPhoneNumberText(e.target.value);
  };

  const handleSave = async () => {
    if (user?.id === undefined) return;
    const userRef = doc(db, "users", user?.id);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    // Update user profile
    await updateDoc(userRef, {
      phoneNumber: phoneNumberText,
    });
    dispatch(setUser({ ...user, phoneNumber: phoneNumberText }));

    // dispatch(setUser())
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChangeImg: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

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
              Your highest score: {user?.score}
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
                  value={user?.fullName ? user.fullName : ""}
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
                  value = {phoneNumberText||""}
                  onChange={handleChange}
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
