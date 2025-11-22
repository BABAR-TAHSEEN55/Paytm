import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  Users as UsersIcon,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserType {
  username: string;
  _id: number;
}

interface ModalProps {
  onClose: () => void;
  type: "transfer" | "request";
}

interface UserProps {
  user: UserType;
  type: "transfer" | "request";
  onSelect: () => void;
}

const Modal: React.FC<ModalProps> = ({ type, onClose }) => {
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
        console.log("Error while getting user from Db", err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [filter]);

  const isTransfer = type === "transfer";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-3xl"></div>

        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-2 rounded-xl ${
                  isTransfer
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {isTransfer ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownLeft size={20} />
                )}
              </motion.div>
              <h2 className="text-xl font-bold text-white font-display">
                {isTransfer ? "Send Money" : "Request Money"}
              </h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-6"
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: filter ? "100%" : "0%" }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
            />
          </motion.div>

          {/* Users List */}
          <div className="max-h-80 overflow-y-auto hide-scrollbar">
            <AnimatePresence mode="wait">
              {loader ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-12"
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
                      <Loader2 size={32} className="text-cyan-500" />
                    </motion.div>
                    <p className="text-slate-300">Searching users...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <UserCard
                        key={user._id}
                        user={user}
                        type={type}
                        onSelect={onClose}
                        index={index}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="mb-4"
                      >
                        <div className="w-16 h-16 mx-auto bg-slate-800 rounded-2xl flex items-center justify-center">
                          <UsersIcon size={24} className="text-slate-500" />
                        </div>
                      </motion.div>
                      <p className="text-slate-400 text-lg font-medium">
                        No users found
                      </p>
                      <p className="text-slate-500 text-sm mt-1">
                        Try adjusting your search terms
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const UserCard: React.FC<UserProps & { index: number }> = ({
  user,
  type,
  onSelect,
  index,
}) => {
  const navigate = useNavigate();
  const isTransfer = type === "transfer";

  const handleClick = () => {
    navigate(`/send?id=${user._id}&username=${user.username}&type=${type}`);
    onSelect();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="group relative overflow-hidden bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-xl p-4 transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full p-[2px]">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
          </div>
          <div>
            <h4 className="text-white font-medium group-hover:text-cyan-300 transition-colors">
              {user.username}
            </h4>
            <p className="text-slate-500 text-xs">Online</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
            isTransfer
              ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30"
              : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30"
          }`}
        >
          {isTransfer ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownLeft size={14} />
          )}
          <span>{isTransfer ? "Send" : "Request"}</span>
        </motion.button>
      </div>

      {/* Hover shimmer effect */}
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
      />
    </motion.div>
  );
};

export default Modal;
