import { useState } from "react";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { InputBox } from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning";

export default function Signup() {
  const [userName, setuserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Header label={"Sign Up"} />
          <SubHeading label={"Enter your information to create account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="AppleSeed"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            placeholder="japple@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Jap@1234"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign Up"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    userName,
                    firstName,
                    lastName,
                    password,
                  }
                );
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>
          <BottomWarning
            label={"Already have an Account?"}
            text={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

// export function InputBox({label, placeholder, onChange}) {
//     return <div>
//       <div className="text-sm font-medium text-left py-2">
//         {label}
//       </div>
//       <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
//     </div>
// }
