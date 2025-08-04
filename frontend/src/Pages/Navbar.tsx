import { Bell } from "lucide-react";

import monkey from "../assets/pay.webp";
const Navbar = () => {
  return (
    <div className="container fixed top-0   left-0 right-0 text-white mt-6 md:max-w-4xl border border-white/30 rounded-full backdrop-blur-sm ">
      <div className="flex justify-between m-2 items-center  ">
        <div>
          {/* <PhoneForwarded /> */}
          <img src={monkey} width={40} height={40} className="rounded-full" />
        </div>
        <div>
          <Bell />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
