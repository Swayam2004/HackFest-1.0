import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { slideFromLeft, slideFromRight, staggeredSlideUp } from "../../lib/animations";

const speakers = [
	{
		id: "ID_001_ROOT_ACCESS",
		name: "XENON_BYTE",
		role: "SECURITY ARCHITECT",
		rank: "LEGENDARY",
		cpu: "99%",
		image: "images/speaker-1.png",
	},
	{
		id: "ID_002_CORE_SYNC",
		name: "NOVA_LEAK",
		role: "DATA WHISPERER",
		rank: "ELITE",
		cpu: "84%",
		image: "images/speaker-2.png",
	},
];

/* ─── RGB Glitch Image ───────────────────────────────────────────────── */
function GlitchImage({ src, alt }: { src: string; alt: string }) {
	const [glitching, setGlitching] = useState(false);

	useEffect(() => {
		// Trigger random glitch every 3–6 seconds
		const schedule = () => {
			const delay = 3000 + Math.random() * 3000;
			return setTimeout(() => {
				setGlitching(true);
				// Glitch lasts ~600ms
				setTimeout(() => {
					setGlitching(false);
					schedule();
				}, 600);
			}, delay);
		};
		const t = schedule();
		return () => clearTimeout(t);
	}, []);

	return (
		<div className="relative w-full h-full select-none overflow-hidden">
			{/* Base image */}
			<img src={src} alt={alt} className="w-full h-full object-cover block" />

			{/* RGB split layers — only visible during glitch */}
			{glitching && (
				<>
					{/* Red channel — shifted right */}
					<img
						src={src}
						alt=""
						aria-hidden
						className="absolute inset-0 w-full h-full object-cover pointer-events-none"
						style={{
							mixBlendMode: "screen",
							filter: "url(#red-channel)",
							transform: "translate(6px, -2px)",
							opacity: 0.85,
							animation: "glitch-red 0.6s steps(1) forwards",
						}}
					/>
					{/* Cyan channel — shifted left */}
					<img
						src={src}
						alt=""
						aria-hidden
						className="absolute inset-0 w-full h-full object-cover pointer-events-none"
						style={{
							mixBlendMode: "screen",
							filter: "url(#cyan-channel)",
							transform: "translate(-6px, 3px)",
							opacity: 0.85,
							animation: "glitch-cyan 0.6s steps(1) forwards",
						}}
					/>

					{/* Scan slice overlay */}
					<div
						className="absolute left-0 right-0 bg-white/10 pointer-events-none"
						style={{
							top: `${20 + Math.random() * 60}%`,
							height: `${4 + Math.random() * 8}px`,
							animation: "glitch-slice 0.6s steps(3) forwards",
						}}
					/>
				</>
			)}

			{/* SVG filters for channel isolation */}
			<svg width="0" height="0" className="absolute">
				<defs>
					<filter id="red-channel">
						<feColorMatrix
							type="matrix"
							values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
						/>
					</filter>
					<filter id="cyan-channel">
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
						/>
					</filter>
				</defs>
			</svg>

			<style>{`
        @keyframes glitch-red {
          0%   { transform: translate(6px, -2px); }
          25%  { transform: translate(-4px, 4px); }
          50%  { transform: translate(8px, 0px); }
          75%  { transform: translate(-2px, -3px); }
          100% { transform: translate(6px, -2px); }
        }
        @keyframes glitch-cyan {
          0%   { transform: translate(-6px, 3px); }
          25%  { transform: translate(5px, -2px); }
          50%  { transform: translate(-8px, 1px); }
          75%  { transform: translate(3px, 4px); }
          100% { transform: translate(-6px, 3px); }
        }
        @keyframes glitch-slice {
          0%   { opacity: 1; top: 20%; }
          33%  { opacity: 0.5; top: 55%; }
          66%  { opacity: 1; top: 75%; }
          100% { opacity: 0; }
        }
      `}</style>
		</div>
	);
}

/* ─── Speaker Card ───────────────────────────────────────────────────── */
function SpeakerCard({ speaker, index }: { speaker: (typeof speakers)[0]; index: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<motion.div
			ref={ref}
			variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
			initial="hidden"
			animate={inView ? "visible" : "hidden"}
			whileHover={{ y: -6, transition: { duration: 0.2 } }}
			className="bg-hack-black border-4 border-hack-black flex flex-col relative group"
		>
			{/* Image area */}
			<div className="relative w-full aspect-square overflow-hidden border-[8px] md:border-[16px] border-hack-black -mb-4 md:-mb-8">
				<GlitchImage src={speaker.image} alt={speaker.name} />
				{/* Desaturate overlay (lifts on hover) */}
				<div className="absolute inset-0 bg-white mix-blend-saturation group-hover:opacity-0 transition-opacity duration-500" />
			</div>

			{/* Info panel */}
			<div className="bg-white border-4 border-hack-black shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] p-4 md:p-6 relative z-[1]">
				<div className="font-mono font-bold text-[10px] md:text-xs text-hack-red mb-1 md:mb-2 uppercase">{speaker.id}</div>
				<div className="font-body font-black text-lg sm:text-xl md:text-2xl lg:text-3xl text-hack-black uppercase tracking-tight leading-none mb-1 md:mb-2">{speaker.name}</div>
				<div className="font-body font-black text-xs md:text-sm text-hack-red uppercase mb-3 md:mb-4">{speaker.role}</div>
				<div className="border-t-2 border-hack-black pt-3 md:pt-[18px] flex justify-between items-center">
					<div className="bg-hack-black px-2 py-0.5">
						<span className="font-mono text-[8px] md:text-[10px] text-white uppercase">RANK: {speaker.rank}</span>
					</div>
					<span className="font-mono text-[8px] md:text-[10px] text-hack-black uppercase">CPU_LOAD: {speaker.cpu}</span>
				</div>
			</div>
		</motion.div>
	);
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function GuestSpeaker() {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section ref={ref} id="speakers" className="bg-hack-yellow py-16 md:py-24 px-4 md:px-6">
			<div className="max-w-7xl w-full mx-auto">
				{/* Heading */}
				<motion.h2
					initial={{ opacity: 0, y: 24 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.12 }}
					className="font-display font-bold text-[36px] sm:text-[48px] md:text-[7vw] lg:text-[100px] xl:text-[128px]
            leading-[0.85] tracking-tighter uppercase text-hack-black mb-10 md:mb-20"
				>
					GUEST ENTITIES
				</motion.h2>

				{/* Cards grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
					{speakers.map((speaker, i) => (
						<SpeakerCard key={speaker.id} speaker={speaker} index={i} />
					))}

					{/* Placeholder card */}
					<motion.div
						custom={2}
						variants={staggeredSlideUp}
						initial="hidden"
						animate={inView ? "visible" : "hidden"}
						className="border-4 md:border-[6px] border-dashed border-black/20 flex flex-col items-center justify-center
              p-10 md:p-14 min-h-[300px] md:min-h-[400px]"
					>
						<div className="font-mono font-black text-4xl text-black/20 mb-4">?</div>
						<div className="font-body font-black text-sm md:text-base text-black/30 uppercase text-center tracking-wider">Next_Signal_Pending...</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
