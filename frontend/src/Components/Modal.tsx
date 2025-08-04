import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserType {
  username: string;
  _id: number;
}
interface UserProps {
  user: UserType;
}
const Modal = () => {
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
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm text-white flex items-center justify-center z-50">
      <div className="container mx-auto max-w-2xl rounded-xl shadow-lg bg-[#222322] p-4">
        {/* <button onClick={}> */}
        <X />
        {/* </button> */}
        {users.map((user) => (
          <Users key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Modal;

const Users = ({ user }: UserProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex m-4 justify-between">
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
