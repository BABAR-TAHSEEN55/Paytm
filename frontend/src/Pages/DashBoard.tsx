import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import type { RequestState } from "../types";

const DashBoard = () => {
  const [requests, setRequests] = useState<RequestState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/user/request", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setRequests(res.data.IncomingRequest);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleRequest = async (requestId: string) => {
    try {
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
      await axios.get("http://localhost:9000/api/v1/user/request-to-response", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      toast.success("Transfer Successful");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const rejectRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((req) => req._id !== requestId));
    toast.info("Request declined");
  };

  if (loading) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"
          />
          <span className="ml-3 text-slate-300">Loading requests...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-h-96 overflow-y-auto hide-scrollbar ">
      <AnimatePresence mode="wait">
        {requests.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {requests.map((req, index) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden bg-slate-800/40 border border-slate-700 hover:border-slate-600 rounded-xl p-4 transition-all duration-200 "
              >
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>

                {req?.status === "pending" ? (
                  <>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-slate-700/50 rounded-lg">
                        <User size={16} className="text-slate-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          <span className="text-cyan-400 font-semibold">
                            {req.from?.username}
                          </span>{" "}
                          wants funding
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                          <Clock size={12} />
                          <span>Pending approval</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                        onClick={() => handleRequest(req?._id || "")}
                      >
                        <CheckCircle size={16} />
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        onClick={() => rejectRequest(req?._id || "")}
                      >
                        <XCircle size={16} />
                        Decline
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-400 text-center py-4">
                    Request processed
                  </div>
                )}

                {/* Hover shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-4"
            >
              <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center">
                <CheckCircle size={24} className="text-slate-500" />
              </div>
            </motion.div>
            <p className="text-slate-400">All caught up!</p>
            <p className="text-xs text-slate-500 mt-1">No pending requests</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashBoard;
