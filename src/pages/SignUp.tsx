import React, { useEffect, useState } from "react";
import { Col, ConfigProvider, Form, Input, message } from "antd";
import BgRequire from "../assets/images/Thumbnail.svg";
import { useNavigate } from "react-router-dom";
import { FormDataSignUp } from "../model/model";
import { auth, db, addDoc} from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAppDispatch } from "../app/hook";
import { setUser } from "../features/userSlice";
import { collection, doc, setDoc } from "firebase/firestore"; 

const styleBgRequire: React.CSSProperties = {
  backgroundImage: `url(${BgRequire})`,
  position: "relative",
  height: "100%",
  backgroundSize: "cover",
};

const styleBgGradient: React.CSSProperties = {
  height: "100vh",
  width: "100%",
  zIndex: 100,
  background: "rgba(0,0,0,0.4)",
  backgroundPosition: "center",
  backgroundImage:
    "linear-gradient(to top, rgba(0,0,0,0.8) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%)",
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const initialState: FormDataSignUp = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [messageApi, contextHolder] = message.useMessage();

  //Handle formData Sign up change
  const [formData, setFormData] = useState<FormDataSignUp>(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState<string>("");

  //Handle Sign Up
  const handleSignUp = () => {
    const { fullName, email, password, confirmPassword } = formData;
    if (!email || !password || !fullName || !confirmPassword) {
      let message = errorMessage;
      message =
        "Please enter full name, email, password and confirm password. ";
      setErrorMessage(message);
      return;
    }
    if (password !== confirmPassword) {
      let message = errorMessage;
      message = "Password and Confirm Password is not match. ";
      setErrorMessage(message);
      return;
    }
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName,
          });
          if(user?.uid === undefined) return;
          addDbUser(user?.uid, fullName, email, "", "", 0);
          dispatch(setUser({id: user.uid, fullName: fullName, email: email, photoURL:"", phoneNumber:"", score:0}))
          navigate("/")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  const addDbUser = async (
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    photoURL: string,
    score: number,
  ) => {
    try {
      const userRef = collection(db, "users")
      await setDoc(doc(userRef, id),{
        id: id,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        photoURL: photoURL,
        score: score,
      }) 
      console.log("Document written with ID: ", userRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //Handle error message
  const error = () => {
    messageApi.open({
      type: "error",
      content: errorMessage,
    });
  };
  useEffect(() => {
    if (errorMessage) error();
  }, [errorMessage]);

  return (
    <Col style={styleBgRequire}>
      {contextHolder}
      <Col style={styleBgGradient}>
        <Col
          span={24}
          className="flex justify-center items-center flex-col max-h-[100%] bottom-[-50%]"
          style={{ transform: "translate(0, calc(-50%))" }}
        >
          <Form
            className="p-[70px] max-w-[500px]"
            style={{ background: "rgba(0,0,0, 0.85)" }}
          >
            <h3 className="text-[30px] leading-[36px] font-[700] text-[#fff] mt-0">
              Sign Up
            </h3>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#dc0a2d",
                },
              }}
            >
              <Input
                size="large"
                placeholder="Full Name"
                type="text"
                name="fullName"
                onChange={handleChange}
                className="font-[500] px-[8px] py-[10px] rounded-[4px] min-w-[300px]"
              />
              <Input
                size="large"
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                className="font-[500] px-[8px] py-[10px] rounded-[4px] min-w-[300px] mt-[16px]"
              />
              <Input
                size="large"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                className="font-[500] px-[8px] py-[10px] rounded-[4px] mt-[16px] min-w-[300px]"
              />
              <Input
                size="large"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                className="font-[500] px-[8px] py-[10px] rounded-[4px] mt-[16px] min-w-[300px]"
              />
            </ConfigProvider>
            <button
              onClick={handleSignUp}
              className="text-white bg-main cursor-pointer border-none text-[24px] h-full w-full px-[24px] py-[16px] hover:opacity-70 rounded-[4px] leading-[24px] flex justify-center items-center mt-[36px] text-[#fff] font-[700]"
            >
              Sign Up
            </button>
            <p className="text-white mb-0 text-[#fff] font-[500]">
              <span className="opacity-50 text-[16px]">
                Already have to account ?{" "}
              </span>
              &nbsp;
              <span
                onClick={() => navigate("/sign-in")}
                className="hover:underline hover:opacity-70 text-[16px]"
              >
                Sign In
              </span>
            </p>
          </Form>
        </Col>
      </Col>
    </Col>
  );
};

export default SignUp;
