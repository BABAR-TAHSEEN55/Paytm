interface ButtonProp {
  button: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({ button, onClick }: ButtonProp) => {
  return (
    <div className="bg-black  w-full mt-4 rounded-xl text-center p-1 hover:scale-75 transition duration-150j">
      <button onClick={onClick} className="text-white  font-bold text-lg">
        {button}
      </button>
    </div>
  );
};

export default Button;
