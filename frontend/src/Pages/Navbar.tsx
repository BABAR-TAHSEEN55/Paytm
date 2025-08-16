import { Bell } from "lucide-react";

import { useEffect, useState } from "react";
import DashBoard from "./DashBoard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
	const [username, setUsername] = useState("");
	useEffect(() => {
		axios
			.get("http://localhost:9000/api/v1/user/details", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				// console.log("Inside from Navbar : ", res.data.GetDetails);
				setUsername(res.data.GetDetails.username);
			})
			.catch((err) => {
				console.log("Error while getting users from DB", err);
			});
	}, []);
	const [Toggle, setToggle] = useState(false);
	const HandleToggle = () => {
		setToggle((prev) => !prev);
	};
	const navigate = useNavigate();

	const HandleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<div className="container fixed top-0   left-0 right-0 text-white mt-6 md:max-w-8xl border border-white/30 rounded-full backdrop-blur-sm z-50">
			<div className="flex justify-between m-2 items-center  ">
				<p className="font-bold  tracking-widest">
					{/* <PhoneForwarded /> */}
					{/*<img src={monkey} width={40} height={40} className="rounded-full" />*/}
					Speedytm
				</p>
				<div className="flex space-x-4">
					<p>{username}</p>
					<button onClick={HandleToggle}>
						<Bell />
					</button>{" "}
					<p onClick={HandleLogout}>Logout</p>
				</div>
			</div>
			<div className="bg-red-200">{Toggle && <DashBoard />}</div>
		</div>
	);
};

export default Navbar;
