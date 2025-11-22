import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Send as SendIcon,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Send: React.FC = () => {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const username = searchparams.get("username");
  const id = searchparams.get("id");
  const type = searchparams.get("type");

  const isTransfer = type === "transfer";

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      if (isTransfer) {
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
        toast.success("Transfer successful!");
      } else {
        await axios.post(
          "http://localhost:9000/api/v1/user/request",
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
        toast.success("Request sent successfully!");
      }
      navigate("/ui");
    } catch {
      toast.error(isTransfer ? "Insufficient balance!" : "Request failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-900/15 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Decorative glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-3xl"></div>

        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-3 rounded-xl ${
                  isTransfer
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {isTransfer ? (
                  <ArrowUpRight size={24} />
                ) : (
                  <ArrowDownLeft size={24} />
                )}
              </motion.div>
              <h1 className="text-2xl font-bold text-white font-display">
                {isTransfer ? "Send Money" : "Request Money"}
              </h1>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto"></div>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 mb-6"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full p-[2px]">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">{username}</h3>
              <p className="text-slate-400 text-sm">
                {isTransfer ? "Transfer recipient" : "Request target"}
              </p>
            </div>
          </motion.div>

          {/* Amount Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <label className="block text-slate-300 text-sm font-medium mb-3">
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg font-mono">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white text-lg font-mono placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                min="0"
                step="0.01"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: amount ? "100%" : "0%" }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleSubmit}
            disabled={loading || !amount}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all relative overflow-hidden group ${
              isTransfer
                ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-center gap-3"
                >
                  <Loader2 size={20} className="animate-spin" />
                  <span>Processing...</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-center gap-3"
                >
                  <SendIcon size={20} />
                  <span>
                    {isTransfer ? "Initiate Transfer" : "Send Request"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button shimmer effect */}
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            />
          </motion.button>

          {/* Cancel Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate("/ui")}
            className="w-full mt-4 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-xl font-medium transition-all"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Cancel
          </motion.button>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 p-3 bg-slate-800/30 border border-slate-700 rounded-lg"
          >
            <p className="text-xs text-slate-400 text-center">
              🔒 All transactions are secured with end-to-end encryption
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Send;
