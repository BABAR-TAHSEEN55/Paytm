import { useEffect, useState } from "react";

// import User from "./User";
import axios from "axios";
import { toast } from "react-toastify";

interface RequestState {
	username: string;
	status: string;
	from: string;
	_id?: string;
}
const DashBoard = () => {
	// const [balance, setBalance] = useState(0);
	const [Request, setRequest] = useState<RequestState[]>([]);
	const [Refresh, setRefresh] = useState(0);
	useEffect(() => {
		axios
			.get("http://localhost:9000/api/v1/user/request", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				setRequest(res.data.IncomingRequest);
				// console.log("Result:", res.data.IncomingRequest);
			});
	}, [Refresh]);
	const HanldeReuqest = async (requestId: string) => {
		try {
			setRequest((prev) => prev.filter((req) => req._id != requestId));
			await axios.get("http://localhost:9000/api/v1/user/request-to-response", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			toast.success("Succesffully");
			setRefresh((prev) => prev + 1);
		} catch {
			toast.error("something went wrong");
			setRefresh((prev) => prev + 1);
		}
	};

	return (
		<div className="relative">
			<div className="absolute bg-[#222322] p-6 rounded-xl right-0 m-2 text-white shadow-lg max-w-sm max-h-96 overflow-y-auto [&::-webkit-scrollbar]:hidden">
				{Request.length > 0 ? (
					Request.map((req, index) => (
						<div key={index} className="mb-4 border-b border-gray-700 pb-3">
							{req?.status == "pending" ? (
								<>
									<p className="text-lg font-mono">
										<span className="font-bold">{req.from?.username}</span> wants funding. Transfer?
									</p>
								</>
							) : (
								<>No Request</>
							)}
							<div className="flex gap-3 mt-2">
								<button
									className="px-4 py-1 bg-green-600 rounded-xl hover:bg-green-700"
									onClick={() => HanldeReuqest(req?._id || "")}
								>
									Yes
								</button>
								<button className="px-4 py-1 bg-red-500 rounded-xl hover:bg-red-700">No</button>
							</div>
						</div>
					))
				) : (
					<p className="text-gray-400">No requests at the moment.</p>
				)}
			</div>
		</div>
	);
};
export default DashBoard;
