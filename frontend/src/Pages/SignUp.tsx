import { useState } from "react";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  return (
    <div className="grid place-content-center min-h-screen bg-blue-200">
      <div className=" m-4 md:w-full bg-blue/80 shadow-lg p-4 rounded-xl">
        <Heading label="SignUp" />
        <SubHeading subheading="Enter your information to create an Account" />
        <InputBox
          label="UserName"
          placeholder="John Doe"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <InputBox label="Last Name" placeholder="Jane Doe" /> */}
        <InputBox
          label="Email"
          placeholder="JohnDoe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          label="Password"
          placeholder="123455..."
          onChange={(e) => SetPassword(e.target.value)}
        />
        <Button
          onClick={async () => {
            try {
              const response = await axios.post(
                "http://localhost:9000/api/v1/user/signup",
                {
                  username,
                  email,
                  password,
                }
              );
              if (response.status == 200 || response.status == 201) {
                navigate("/signin");
              }
            } catch (error) {
              console.log("SignUp Error : ", error);
            }
          }}
          button="SignUP"
        />
      </div>
    </div>
  );
};

export default SignUp;
