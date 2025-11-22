import React, { useState, useEffect } from "react";
import { Bell, CreditCard, User, LogOut, ThermometerSnowflake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashBoard from "./DashBoard";

const Navbar: React.FC = () => {
  const [username, setUsername] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/user/details", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUsername(res.data.GetDetails.username);
      })
      .catch((err) => {
        console.log("Error while getting users from DB", err);
      });
  }, []);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center bg-transparent   backdrop-blur-md border-b border-slate-800  py-6"
      >
        {/* Logo Section */}
        <motion.div
          className="flex items-center gap-3 group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="relative">
            {/*<div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <div className="relative bg-slate-900 p-2 rounded-full border border-slate-700 text-cyan-400">*/}
              <CreditCard size={24} />
            {/*</div>
          </div>*/}
            </div>
          <span className="text-xl font-bold font-display tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            SPEED<span className="text-cyan-500">YTM</span>
          </span>
        </motion.div>

        <div className="md:hidden"><ThermometerSnowflake/></div>
        {/* Right Actions */}
        <div className="md:flex items-center gap-4 hidden ">
          <motion.button
            className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800/50"
            onClick={handleToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            <AnimatePresence>
              {toggle && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"
                />
              )}
            </AnimatePresence>
          </motion.button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">
                {username || "Guest"}
              </p>
              <p className="text-xs text-slate-400">Premium Member</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <User size={20} className="text-cyan-200" />
              </div>
            </div>
            <motion.button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-900/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Logout"
            >
              <LogOut size={18} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Notification Panel */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-0 z-40  max-w-[18rem] w-full"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl ">
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Bell size={16} className="text-cyan-400" />
                  Notifications
                </h3>
              </div>
              <DashBoard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {toggle && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setToggle(false)}
        />
      )}
    </>
  );
};

export default Navbar;
