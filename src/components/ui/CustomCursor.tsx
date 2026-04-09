import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);
	const [hovered, setHovered] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			if (!isVisible) setIsVisible(true);
			cursorX.set(e.clientX - 16);
			cursorY.set(e.clientY - 16);
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			// Simple logic to detect clickable elements
			if (
				target.tagName.toLowerCase() === 'a' ||
				target.tagName.toLowerCase() === 'button' ||
				target.closest('a') !== null ||
				target.closest('button') !== null ||
				target.getAttribute('role') === 'button'
			) {
				setHovered(true);
			} else {
				setHovered(false);
			}
		};

		const handleMouseLeave = () => setIsVisible(false);
		const handleMouseEnter = () => setIsVisible(true);

		window.addEventListener('mousemove', moveCursor);
		window.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('mouseenter', handleMouseEnter);

		return () => {
			window.removeEventListener('mousemove', moveCursor);
			window.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('mouseenter', handleMouseEnter);
		};
	}, [cursorX, cursorY, isVisible]);

	return (
		<motion.div
			className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
			animate={{ opacity: isVisible ? 1 : 0 }}
			transition={{ duration: 0.15 }}
			style={{
				x: cursorXSpring,
				y: cursorYSpring,
			}}
		>
			<svg 
				width="32" 
				height="32" 
				viewBox="0 0 32 32" 
				className="transition-all duration-150" 
				style={{ 
					transform: hovered ? 'scale(1.3) rotate(45deg)' : 'scale(1) rotate(0deg)',
					filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,1))'
				}}
			>
				{/* Inner static crosshair */}
				<path 
					d="M16 4 L16 12 M16 20 L16 28 M4 16 L12 16 M20 16 L28 16" 
					stroke="#fde403" 
					strokeWidth="2" 
					strokeLinecap="square" 
					className="transition-colors duration-150"
				/>
				
				{/* Center core */}
				<rect 
					x="14" y="14" width="4" height="4" 
					fill="#fde403" 
					className="transition-colors duration-150"
				/>
			</svg>
		</motion.div>
	);
}
