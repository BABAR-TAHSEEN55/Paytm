import { motion } from "framer-motion";
interface FloatingProps {
	left: string;
	top: string;
	color: string;
	size: string;
	index: string;
	delay?: number;
}
const Floating = ({ left, delay, top, color, size }: FloatingProps) => {
	return (
		<motion.div
			animate={{
				x: ["0", "100%", "0"],
				y: ["0", "100%", "0"],
				rotate: [0, 360],
			}}
			transition={{
				delay: delay,
				duration: 20,
				ease: "linear",
				repeat: Infinity,
			}}
			style={{ left, top }}
			className={`absolute ${color} rounded-full blur opacity-30 ${size}`}
		></motion.div>
	);
};

export default Floating;
