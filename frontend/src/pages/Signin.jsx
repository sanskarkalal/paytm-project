import React, { useState } from "react";
import Header from "../components/Header";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  // console.log(userName, password);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className=" flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Header label={"Sign In"} />
          <SubHeading label={"Enter your credentials to sign in"} />
          <InputBox
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            label={"Email"}
            placeholder={"japple@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"Jap@123"}
          />
          <div className="pt-4">
            <Button
              label={"Sign In"}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signin",
                    {
                      userName: userName,
                      password: password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("name", response.data.user.firstName);
                  console.log(response.data.user.firstName);
                  navigate("/dashboard");
                } catch (error) {
                  console.log(error);
                  alert("Wrong Credentials Try again");
                }
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            text={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
