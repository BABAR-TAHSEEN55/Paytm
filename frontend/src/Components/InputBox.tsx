interface InputBoxProp {
	label: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputBox = ({ label, placeholder, onChange }: InputBoxProp) => {
	return (
		<div className="text-md flex flex-col mt-2">
			{label}
			<input
				type="text"
				className="rounded-xl p-2 mt-2 bg-[#201c24]"
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default InputBox;
