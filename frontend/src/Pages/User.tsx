import axios from "axios";
import { useEffect, useState } from "react";
import InputBox from "../Components/InputBox";
import { useNavigate } from "react-router-dom";

interface UserType {
  username: string;
  _id: number;
}
interface UserProps {
  user: UserType;
}
const User = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/user/bulk?filter=" + filter)
      .then((res) => {
        setUsers(res.data.Users);
      });
  }, [filter]);
  return (
    <div>
      <h1 className="py-8 text-2xl font-semibold">Users</h1>
      <InputBox
        label="Money"
        placeholder="Enter your money"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />

      {users.map((user) => (
        <Users key={user._id} user={user} />
      ))}
    </div>
  );
};
const Users = ({ user }: UserProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between m-4 ">
        <div className="flex space-x-4 justify-center items-center ">
          <div className="size-8 bg-gray-500 rounded-full flex items-center justify-center">
            F
          </div>
          <div>{user.username}</div>
        </div>
        {/* <Button button="Send Money" onClick={()=>{}}/> */}
        <button
          className="bg-black px-1 py-1.5 rounded-xl text-white "
          onClick={() => {
            navigate("/send?id=" + user._id + "&username=" + user.username);
          }}
        >
          Send Money
        </button>
      </div>
    </>
  );
};

export default User;
