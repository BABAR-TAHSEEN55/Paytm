import { useState } from "react";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="grid place-content-center min-h-screen bg-blue-200">
      <div className=" m-4 md:w-full bg-blue/80 shadow-lg p-4 rounded-xl">
        <Heading label="SignUp" />
        <SubHeading subheading="Enter your information to create an Account" />
        <InputBox
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="JohnDoe@gmail.com"
        />
        <InputBox
          label="Password"
          placeholder="123455..."
          onChange={(e) => SetPassword(e.target.value)}
        />
        <Button
          button="SignIn"
          onClick={async () => {
            try {
              const response = await axios.post(
                "http://localhost:9000/api/v1/user/signin",
                {
                  email,
                  password,
                }
              );
              const { AccessToken } = response.data;
              localStorage.setItem("token", AccessToken);
              navigate("/DashBoard");
            } catch (error) {
              console.log("Error while Signing user Up");
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
