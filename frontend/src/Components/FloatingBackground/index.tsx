import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Particle {
	id: number;
	x: number;
	y: number;
	size: number;
	color: string;
	delay: number;
	variant: "float" | "pulse" | "wiggle" | "orbit";
}

interface FloatingBackgroundProps {
	particleCount?: number;
	enableMouseInteraction?: boolean;
}

const FloatingBackground = ({ particleCount = 8, enableMouseInteraction = true }: FloatingBackgroundProps) => {
	const [particles, setParticles] = useState<Particle[]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const colors = useMemo(() => [
		"bg-purple-400",
		"bg-blue-400",
		"bg-pink-400",
		"bg-green-400",
		"bg-yellow-400",
		"bg-indigo-400",
		"bg-red-400",
		"bg-teal-400"
	], []);

	const sizes = useMemo(() => ["size-12", "size-16", "size-20", "size-24", "size-28", "size-32"], []);
	const variants = useMemo((): Array<"float" | "pulse" | "wiggle" | "orbit"> => ["float", "pulse", "wiggle", "orbit"], []);

	useEffect(() => {
		const generateParticles = () => {
			const newParticles: Particle[] = [];
			for (let i = 0; i < particleCount; i++) {
				newParticles.push({
					id: i,
					x: Math.random() * 100,
					y: Math.random() * 100,
					size: Math.floor(Math.random() * sizes.length),
					color: colors[Math.floor(Math.random() * colors.length)],
					delay: Math.random() * 5,
					variant: variants[Math.floor(Math.random() * variants.length)]
				});
			}
			setParticles(newParticles);
		};

		generateParticles();
	}, [particleCount, sizes.length, colors, variants]);

	useEffect(() => {
		if (!enableMouseInteraction) return;

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [enableMouseInteraction]);

	const getAnimationVariant = (variant: string, delay: number, mouseX: number, mouseY: number) => {
		const baseMouseEffect = enableMouseInteraction ? {
			x: [(mouseX - 50) * 0.1, (mouseX - 50) * 0.2, (mouseX - 50) * 0.1],
			y: [(mouseY - 50) * 0.1, (mouseY - 50) * 0.2, (mouseY - 50) * 0.1]
		} : {};

		switch (variant) {
			case "pulse":
				return {
					animate: {
						scale: [1, 1.8, 1],
						opacity: [0.2, 0.7, 0.2],
						...baseMouseEffect
					},
					transition: {
						delay,
						duration: 4,
						ease: "easeInOut" as const,
						repeat: Infinity,
					},
				};
			case "wiggle":
				return {
					animate: {
						x: [0, 15, -15, 0, ...(baseMouseEffect.x || [])],
						y: [0, -15, 15, 0, ...(baseMouseEffect.y || [])],
						rotate: [0, 8, -8, 0],
					},
					transition: {
						delay,
						duration: 5,
						ease: "easeInOut" as const,
						repeat: Infinity,
					},
				};
			case "orbit":
				return {
					animate: {
						x: [0, 60, 0, -60, 0],
						y: [0, -60, 0, 60, 0],
						rotate: [0, 360],
						...baseMouseEffect
					},
					transition: {
						delay,
						duration: 10,
						ease: "linear" as const,
						repeat: Infinity,
					},
				};
			default: // 'float'
				return {
					animate: {
						x: [0, 40, -30, 20, 0],
						y: [0, -30, 40, -20, 0],
						...baseMouseEffect
					},
					transition: {
						delay,
						duration: 6,
						ease: "easeInOut" as const,
						repeat: Infinity,
					},
				};
		}
	};

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden">
			{particles.map((particle) => {
				const animation = getAnimationVariant(
					particle.variant,
					particle.delay,
					mousePosition.x,
					mousePosition.y
				);

				return (
					<motion.div
						key={particle.id}
						className={`absolute rounded-full ${particle.color} ${sizes[particle.size]} opacity-30`}
						style={{
							left: `${particle.x}%`,
							top: `${particle.y}%`,
						}}
						{...animation}
					/>
				);
			})}
		</div>
	);
};

export default FloatingBackground;
