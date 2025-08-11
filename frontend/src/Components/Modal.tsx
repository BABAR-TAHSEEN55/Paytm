import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserType {
	username: string;
	_id: number;
}
export interface UserProps {
	user?: UserType;
	type?: "transfer" | "request";
}
interface ModalProps {
	onClose: () => void;
	type: "transfer" | "request";
}
const Modal = ({ type, onClose }: ModalProps) => {
	const [loader, setLoader] = useState(false);
	const [filter, setFilter] = useState("");
	const [users, setUsers] = useState<UserType[]>([]);
	useEffect(() => {
		setLoader(true);
		axios
			.get("http://localhost:9000/api/v1/user/bulk?filter=" + filter, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				setUsers(res.data.Users);
			})
			.catch((err) => {
				console.log("Error while fetching data", err);
			})
			.finally(() => {
				setLoader(false);
			});
	}, [filter]);
	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm text-white flex items-center justify-center z-50">
			<div className="container mx-auto max-w-2xl rounded-xl shadow-lg bg-[#222322] p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">
						{type == "transfer" ? "Send Money" : "Request Money"}
						{/*Send Money*/}
					</h2>
					<button onClick={onClose} className="hover:bg-gray-700 p-1 rounded">
						<X />
					</button>
				</div>
				<input
					type="text"
					placeholder="Search users..."
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mb-4"
				/>
				{/*//Loader*/}
				{loader ? (
					<div className="flex items-center justify-center space-x-4">
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

						<p className="text-lg ">Processing…</p>
					</div>
				) : (
					<div className="max-h-60 overflow-y-auto">
						{users.length > 0 ? (
							users.map((user) => <Users key={user._id} user={user} type={type} />)
						) : (
							<p className="font-bold text-center mt-4">No User exist</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;

const Users = ({ user, type }: UserProps) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex m-4 justify-between">
				<div className="flex space-x-4 justify-center items-center ">
					<div className="size-8 bg-gray-500 rounded-full flex items-center justify-center">F</div>
					<div>{user.username}</div>
				</div>
				{/* <Button button="Send Money" onClick={()=>{}}/> */}
				<button
					className="bg-black px-1 py-1.5 rounded-xl text-white  hover:bg-[#2F0333]  "
					onClick={() => {
						navigate("/send?id=" + user._id + "&username=" + user.username);
					}}
				>
					{/*Send Money*/}
					{type == "transfer" ? "Send Money" : "Request Money "}
				</button>
			</div>
		</>
	);
};
