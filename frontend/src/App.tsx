import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Send from "./Pages/Send";
import { ToastContainer } from "react-toastify";
import UI from "./Pages/UI";
import Navbar from "./Pages/Navbar";
import DashBoard from "./Pages/DashBoard";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated gradient blobs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[128px]"
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <BrowserRouter>
        <div className="relative z-10">
          {/* Conditional Navbar - only show on authenticated routes */}
          <Routes>
            <Route
              path="/ui"
              element={
                <>
                  <Navbar />
                  <UI />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <Navbar />
                  <DashBoard />
                </>
              }
            />
            <Route
              path="/send"
              element={
                <>
                  <Navbar />
                  <Send />
                </>
              }
            />
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>

        {/* Toast Container with custom styling */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "12px",
            color: "#f8fafc",
          }}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
