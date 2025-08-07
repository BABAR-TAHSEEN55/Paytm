interface ButtonProp {
	button: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({ button, onClick }: ButtonProp) => {
	return (
		<div
			className="bg-white  w-full mt-8 rounded-xl text-center p-1 transition  ease-in-out

			  delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-whit duration-300
			"
		>
			<button onClick={onClick} className="text-black  font-bold text-lg">
				{button}
			</button>
		</div>
	);
};

export default Button;
