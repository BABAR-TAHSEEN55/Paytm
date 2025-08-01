import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import DashBoard from "./Pages/DashBoard";
import Send from "./Pages/Send";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
};
export default App;
