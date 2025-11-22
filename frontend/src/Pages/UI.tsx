import  { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Coffee,
  ShoppingBag,
  Wifi,
  Zap,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import axios from "axios";
import Modal from "../Components/Modal";
import type { History, ChartDataPoint } from "../types";

const UI = () => {
  const [balance, setBalance] = useState(0);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [toggle, setToggle] = useState<"transfer" | "request" | null>(null);
  const [userHistory, setUserHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  // Mock chart data for demo
  const chartData: ChartDataPoint[] = [
    { date: "Oct 18", balance: balance - 500 },
    { date: "Oct 19", balance: balance - 400 },
    { date: "Oct 20", balance: balance - 200 },
    { date: "Oct 21", balance: balance + 100 },
    { date: "Oct 22", balance: balance + 300 },
    { date: "Oct 23", balance: balance },
    { date: "Oct 24", balance: balance },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/user/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBalance(res.data.Balance);
        setLoggedInUser(res.data._id);
      });
  }, []);

  // Animate balance count-up effect
  useEffect(() => {
    if (balance > 0) {
      const duration = 1000;
      const steps = 60;
      const increment = balance / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= balance) {
          setAnimatedBalance(balance);
          clearInterval(timer);
        } else {
          setAnimatedBalance(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [balance]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:9000/api/v1/user/history", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserHistory(res.data.TransactionHistory);
      })
      .catch((err) => {
        console.log("Error while fetching data from backend ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case "utilities":
        return <Zap size={18} />;
      case "food":
        return <Coffee size={18} />;
      case "shopping":
        return <ShoppingBag size={18} />;
      case "technology":
        return <Wifi size={18} />;
      default:
        return <ShoppingCart size={18} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 relative text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 pt-24 pb-20">
        {/* Balance Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full max-w-4xl mx-auto mb-8 p-1"
        >
          {/* Decorative Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl rounded-3xl -z-10"></div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden mx-4">
            <div className="flex flex-col md:flex-row justify-between md:items-end items-start gap-8 relative z-10">
              {/* Balance Text */}
              <div className="space-y-2">
                <h2 className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-4">
                  Total Balance
                </h2>
                <div className="flex items-start gap-2  py-3">
                  <span className="text-5xl   font-bold font-display text-white tracking-tighter">
                    $
                    {animatedBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full w-fit text-sm font-medium border border-emerald-400/20">
                  <TrendingUp size={16} />
                  <span>+2.4% this month</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(6,182,212,0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2"
                  onClick={() => setToggle("transfer")}
                >
                  <ArrowUpRight size={20} /> Transfer
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-xl font-bold transition-all"
                  onClick={() => setToggle("request")}
                >
                  Request
                </motion.button>
              </div>
            </div>

            {/* Mini Chart Overlay */}
            <div className="h-[150px] w-full mt-8 -mb-4 opacity-50">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorBalance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis hide domain={["dataMin - 1000", "dataMax + 1000"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#1e293b",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                    itemStyle={{ color: "#22d3ee" }}
                    formatter={(value: number) => [`$${value}`, "Balance"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
        {/*.....*/}

        {/*<div className="flex gap-4  max-w-[52rem] mx-auto justify-between">
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(6,182,212,0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2"
            onClick={() => setToggle("transfer")}
          >
            <ArrowUpRight size={20} /> Transfer
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-xl font-bold transition-all"
            onClick={() => setToggle("request")}
          >
            Request
          </motion.button>
        </div>*/}

        {/* Transaction History */}
        <div className="w-full max-w-4xl mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white font-display font-semibold mb-6 px-2"
          >
            Recent Transactions
          </motion.h3>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-20"
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 size={40} className="text-cyan-500" />
                  </motion.div>
                  <p className="text-lg text-white/80">
                    Loading transactions...
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                {userHistory.length > 0 ? (
                  userHistory.map((transaction, index) => {
                    const isCredit = transaction.from._id !== loggedInUser;
                    const otherUser = isCredit
                      ? transaction.from.username
                      : transaction.to.username;

                    return (
                      <motion.div
                        key={transaction._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                        className="group relative overflow-hidden bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-sm border border-slate-800 hover:border-slate-600 transition-all rounded-2xl p-4 flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`p-3 rounded-xl ${
                              isCredit
                                ? "bg-emerald-900/20 text-emerald-400"
                                : "bg-slate-800 text-slate-300 group-hover:text-white"
                            } transition-colors`}
                          >
                            {getIcon("transfer")}
                          </motion.div>

                          <div>
                            <h4 className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                              {isCredit
                                ? `From ${otherUser}`
                                : `To ${otherUser}`}
                            </h4>
                            <p className="text-slate-500 text-xs">
                              {formatDate(transaction.createdAt || "")} •
                              Transfer
                            </p>
                          </div>
                        </div>

                        <div className="text-right relative z-10">
                          <p
                            className={`font-display font-bold text-lg ${
                              isCredit ? "text-emerald-400" : "text-red-500"
                            }`}
                          >
                            {isCredit ? "+" : "-"}$
                            {Math.abs(Number(transaction.amount)).toFixed(2)}
                          </p>
                          <div
                            className={`flex items-center justify-end gap-1 text-xs ${
                              isCredit
                                ? "text-emerald-500/70"
                                : "text-slate-500"
                            }`}
                          >
                            {isCredit ? (
                              <ArrowDownLeft size={12} />
                            ) : (
                              <ArrowUpRight size={12} />
                            )}
                            <span>{isCredit ? "Received" : "Sent"}</span>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                        />
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mb-4"
                    >
                      <div className="w-20 h-20 mx-auto bg-slate-800/50 rounded-2xl flex items-center justify-center">
                        <ShoppingCart size={32} className="text-slate-500" />
                      </div>
                    </motion.div>
                    <p className="text-xl text-white/80 mb-2">
                      No transactions yet
                    </p>
                    <p className="text-slate-400">
                      Your transaction history will appear here
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {toggle && <Modal type={toggle} onClose={() => setToggle(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default UI;
