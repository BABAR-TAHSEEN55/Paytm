import InputBox from "../Components/InputBox";
import User from "./User";

const DashBoard = () => {
  return (
    <div className="w-full p-6 min-h-screen bg-purple-400/40 ">
      <div className="flex justify-between">
        <h1>Paytm App</h1>
        <div className="flex justify-center items-center space-x-4">
          <p>Hello,User</p>
          <div className="size-9 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <div className="py-10 font-bold  text-xl ">Your Balance : $10000</div>
      <div>
        <h1 className="py-8 text-2xl font-semibold">Users</h1>
        <InputBox
          label="Money"
          placeholder="Enter your money"
          onChange={() => {}}
        />
        <User />
      </div>
    </div>
  );
};

export default DashBoard;
