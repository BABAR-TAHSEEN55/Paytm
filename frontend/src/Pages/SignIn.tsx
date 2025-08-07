import { useState } from "react";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Floating from "./Floating";
import ButtonWarning from "../Components/ButtonWarning";
import BottomWarning from "../Components/BottomWarning";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, SetPassword] = useState("");
	const navigate = useNavigate();
	return (
		<div className="grid place-content-center min-h-screen  relative text-white ">
			{/*<Floating top="10%" left="5%" delay={1} color="bg-gray-300" size="size-64" index="-50" />*/}
			<div className=" m-4 md:w-full bg-blue/80 shadow-lg p-8 rounded-xl border border-white/30  relative z-10 ">
				<Heading label="SignUp" />
				<SubHeading subheading="Enter your Details to signup" />
				<InputBox onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="JohnDoe@gmail.com" />
				<InputBox label="Password" placeholder="123455..." onChange={(e) => SetPassword(e.target.value)} />
				<Button
					button="SignIn"
					onClick={async () => {
						try {
							const response = await axios.post("http://localhost:9000/api/v1/user/signin", {
								email,
								password,
							});
							const { AccessToken } = response.data;
							localStorage.setItem("token", AccessToken);
							console.log("AccessToken : ", AccessToken);
							navigate("/ui");
						} catch (error) {
							console.log("Error while Signing user Up", error);
						}
					}}
				/>
				<BottomWarning label="Already have an account?" buttonTxt="SignUp" to="/" />
			</div>
		</div>
	);
};

export default SignIn;
