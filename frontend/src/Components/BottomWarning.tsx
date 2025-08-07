import { Link } from "react-router-dom";

interface WarningProps {
	label: string;
	buttonTxt: string;
	to: string;
}
const BottomWarning = ({ label, buttonTxt, to }: WarningProps) => {
	return (
		<div>
			<div className="text-white/50 text-center  mt-8 ">
				{label}

				<Link to={to} className="text-white px-2">
					{buttonTxt}
				</Link>
			</div>
		</div>
	);
};

export default BottomWarning;
