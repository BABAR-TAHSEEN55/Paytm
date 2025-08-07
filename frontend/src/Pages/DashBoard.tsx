import { useEffect, useState } from "react";

import User from "./User";
import axios from "axios";

const DashBoard = () => {
	const [balance, setBalance] = useState(0);
	useEffect(() => {
		axios
			.get("http://localhost:9000/api/v1/user/balance", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				setBalance(res.data.Balance);
			});
	}, []);

	return (
		<div className="w-full p-6 min-h-screen bg-purple-400/40 ">
			<div className="flex justify-between">
				<h1>Paytm App</h1>
				<div className="flex justify-center items-center space-x-4">
					<p>Hello,User</p>
					<div className="size-9 bg-gray-400 rounded-full"></div>
				</div>
			</div>
			<div className="py-6 font-bold  text-xl ">Your Balance : ${balance}</div>
			<div>
				<User />
			</div>
		</div>
	);
};
export default DashBoard;
