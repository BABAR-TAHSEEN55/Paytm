import axios from "axios";

import { useEffect, useState } from "react";
import Modal from "../Components/Modal";

interface History {
	_id: string;
	amount: string;
	from: {
		username: string;
	};
	to: {
		username: string;
	};
	status?: string;
	createdAt?: string; //why is this not date?
}

const UI = () => {
	const [balance, setBalance] = useState(0);
	const [Toggle, setToggle] = useState(false);
	const [UserHistory, setUserHistory] = useState<History[]>([]);
	const [Loading, setLoading] = useState(false);
	const HandleToggle = () => {
		setToggle((prev) => !prev);
	};
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

	useEffect(() => {
		setLoading(true);

		axios

			.get("http://localhost:9000/api/v1/user/history", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				console.log("This is the  ", res.data);
				setUserHistory(res.data.TransactionHistory);
			})
			.catch((err) => {
				console.log("Error while fetching data from backend ", err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return (
		<>
			<div className=" m-4 min-h-screen text-white py-20  relative z-0">
				<div className="fixed inset-0 bg-[#2F0333] [mask-image:radial-gradient(80%_20%_at_50%_15%,black,transparent)] -z-10" />
				<div className="container rounded-xl transparent shadow-lg border border-white/30 p-6 max-w-2xl relative ">
					<p className="text-5xl tracking-widest font-bold text-center">${balance}</p>
					<div className="flex items-center justify-center">
						{/* Arrow */}
						<p className="text-center text-white/50 py-3">29.5%</p>
					</div>
				</div>
				<div className="container rounded-xl bg-[#222322]   p-6 mt-4 max-w-2xl z-50">
					<div className="flex justify-between ">
						<button className="bg-black rounded-xl px-3 py-2.5 hover:bg-[#2F0333] " onClick={HandleToggle}>
							Transfer
						</button>
						<button className="bg-black rounded-xl px-3 py-2.5 hover:bg-[#2F0333] " onClick={HandleToggle}>
							Receive
						</button>
					</div>
				</div>

				{!Loading ? (
					<div className="container rounded-xl bg-[#222322]  p-6 mt-10 max-w-3xl relative">
						<p className="text-xs text-white/40">Transaction History</p>

						{UserHistory.length > 0 ? (
							UserHistory.map((user) => (
								<div>
									<p className="font-bold ">
										{user.createdAt
											? new Date(user.createdAt).toLocaleDateString("en-GB", {
													day: "2-digit",
													month: "short",
													year: "numeric",
												})
											: new Date().toLocaleDateString("en-GB", {
													day: "2-digit",
													month: "short",
													year: "numeric",
												})}
									</p>
									<div className="mt-2 flex space-x-4 items-center  justify-between">
										<div className="flex items-center justify-center space-x-4">
											<div className="size-12 bg-red-200 rounded-full flex items-center justify-center text-xl mb-4">
												{user.to.username.charAt(0)}
											</div>
											<p className="lowercase ">{user.to.username}</p>
										</div>

										<p className="text-lg text-red-500">- $ {user.amount}</p>
									</div>
									{/* <div className="w-full h-1 border-dashed bg-white mt-4"></div> */}
								</div>
							))
						) : (
							<p className="py-4 text-white/80">No Transaction History</p>
						)}
					</div>
				) : (
					<div className="flex items-center justify-center flex-col space-y-2 py-10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="animate-spin size-10">
							<radialGradient
								id="a12"
								cx=".66"
								fx=".66"
								cy=".3125"
								fy=".3125"
								gradientTransform="scale(1.5)"
							>
								<stop offset="0" stop-color="#3E6CE8"></stop>
								<stop offset=".3" stop-color="#3E6CE8" stop-opacity=".9"></stop>
								<stop offset=".6" stop-color="#3E6CE8" stop-opacity=".6"></stop>
								<stop offset=".8" stop-color="#3E6CE8" stop-opacity=".3"></stop>
								<stop offset="1" stop-color="#3E6CE8" stop-opacity="0"></stop>
							</radialGradient>
							<circle
								transform-origin="center"
								fill="none"
								stroke="url(#a12)"
								stroke-width="15"
								stroke-linecap="round"
								stroke-dasharray="200 1000"
								stroke-dashoffset="0"
								cx="100"
								cy="100"
								r="70"
							>
								<animateTransform
									type="rotate"
									attributeName="transform"
									calcMode="spline"
									dur="2"
									values="360;0"
									keyTimes="0;1"
									keySplines="0 0 1 1"
									repeatCount="indefinite"
								></animateTransform>
							</circle>
							<circle
								transform-origin="center"
								fill="none"
								opacity=".2"
								stroke="#3E6CE8"
								stroke-width="15"
								stroke-linecap="round"
								cx="100"
								cy="100"
								r="70"
							></circle>
						</svg>

						<p className="text-lg text-white/80 text-center">Loading...</p>
					</div>
				)}
			</div>
			{Toggle && <Modal onClose={HandleToggle} />}
			{/* <div style={{ height: "100vh" }}></div> */}
			{/* <Modal /> */}
		</>
	);
};

export default UI;
