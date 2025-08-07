import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../Components/Button";
import { toast } from "react-toastify";

import InputBox from "../Components/InputBox";
import axios from "axios";
import { useState } from "react";

const Send = () => {
	const navigate = useNavigate();
	const [searchparams] = useSearchParams();
	const [amount, SetAmount] = useState(0);
	const username = searchparams.get("username");
	console.log(username);
	const id = searchparams.get("id");
	console.log(id);
	return (
		<div className="grid place-content-center -purple-400/30 min-h-screen text-white">
			<div className="w-full bg-[#222322]  shadow-lg p-14 rounded-xl ">
				<h1 className="text-2xl text-center pb-8 font-bold ">Send Money</h1>

				<div className="flex space-x-5 items-center ">
					<div className="size-8 bg-gray-400 rounded-full">{username?.charAt(0)}</div>
					<h1 className="text-xl ">{username}</h1>
				</div>

				<InputBox
					label="Amount ($)"
					placeholder="Enter Amount..."
					onChange={(e) => {
						SetAmount(Number(e.target.value));
					}}
				/>
				<Button
					button="Initiate Transfer"
					onClick={async () => {
						try {
							await axios.post(
								"http://localhost:9000/api/v1/user/transactions",
								{
									amount: Number(amount),
									to: id,
								},
								{
									headers: {
										Authorization: "Bearer " + localStorage.getItem("token"),
									},
								},
							);
							toast.success("Transfer sucessfull!");
							navigate("/ui");
						} catch {
							// console.log("Transaction Failed : ", error);
							toast.error("Insufficient Balance! Brokie");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default Send;

//TODO : 1) Notification -> Request Feature // Most prolly
//SHIP BEFORE 10TH INSHALLAH

// 4) SignUp / SignIn floating Circle & already have an account page
// 5) Search in PopUp
