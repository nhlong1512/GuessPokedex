import React, { useEffect, useState } from "react";
import { Col, ConfigProvider, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FormDataSignIn } from "../model/model";
import { auth } from "../firebaseConfig";
import BgRequire from "../assets/images/Thumbnail.svg";

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

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const initialState: FormDataSignIn = {
    email: "",
    password: "",
  };
  const [messageApi, contextHolder] = message.useMessage();

  //Handle change formData Sign in
  const [formData, setFormData] = useState<FormDataSignIn>(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState<string>("");
  //Handle Sign In
  const handleSignIn = () => {
    const { email, password } = formData;
    if (!email || !password) {
      let message = errorMessage;
      message = "Please enter email and password. ";
      setErrorMessage(message);
      return;
    }
    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          //Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          let message = errorMessage;
          message = "The user name or password is incorrect.";
          setErrorMessage(message);
        });
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
              Sign In
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
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="font-[500] px-[8px] py-[10px] rounded-[4px] min-w-[300px]"
              />
              <Input
                size="large"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
                className="font-[500] px-[8px] py-[10px] rounded-[4px] mt-[16px] min-w-[300px]"
              />
            </ConfigProvider>
            <button
              onClick={handleSignIn}
              className="text-white bg-main cursor-pointer border-none text-[24px] h-full w-full px-[24px] py-[16px] hover:opacity-70 rounded-[4px] leading-[24px] flex justify-center items-center mt-[36px] text-[#fff] font-[700]"
            >
              Sign In
            </button>
            <p className="text-white mb-0 text-[#fff] font-[500]">
              <span className="opacity-50 text-[16px]">New To Account ? </span>
              &nbsp;
              <span
                onClick={() => navigate("/sign-up")}
                className="hover:underline hover:opacity-70 text-[16px]"
              >
                Sign Up Now
              </span>
            </p>
          </Form>
        </Col>
      </Col>
    </Col>
  );
};

export default SignIn;
