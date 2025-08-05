import axios from "axios";

import { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { ArrowBigLeft } from "lucide-react";
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
    try {
      axios

        .get("http://localhost:9000/api/v1/user/history", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("This is the  ", res.data);
          setUserHistory(res.data.TransactionHistory);
        });
    } catch (error) {
      console.log("API Call failed ", error);
    }
  }, []);
  return (
    <>
      <div className=" m-4 min-h-screen text-white py-20  relative -z-20">
        <div className="absolute inset-0 bg-[#2F0333] [mask-image:radial-gradient(80%_20%_at_50%_15%,black,transparent)] -z-10" />
        <div className="container rounded-xl transparent shadow-lg border border-white/30 p-6 max-w-2xl relative ">
          <p className="text-5xl tracking-widest font-bold text-center">
            ${balance}
          </p>
          <div className="flex items-center justify-center">
            {/* Arrow */}
            <p className="text-center text-white/50 py-3">29.5%</p>
          </div>
        </div>
        <div className="container rounded-xl bg-[#222322]   p-6 mt-4 max-w-2xl z-50">
          <div className="flex justify-between">
            <button
              className="bg-black rounded-xl px-3 py-2.5 "
              onClick={HandleToggle}
            >
              Transfer
            </button>
            <p className="bg-black rounded-xl px-3 py-2.5 ">Receive</p>
          </div>
        </div>

        <div
          // key={user._id}
          className="container rounded-xl bg-[#222322]  p-6 mt-10 max-w-3xl relative"
        >
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
        {/* ))} */}
      </div>
      {Toggle && <Modal />}
      {/* <div style={{ height: "100vh" }}></div> */}
      {/* <Modal /> */}
    </>
  );
};

export default UI;
