import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { boltOnReveal, popIn } from "../../lib/animations";
import HUDBracket from "../ui/HUDBracket";

gsap.registerPlugin(ScrollTrigger);

interface PrizeCardData {
	amount: string;
	numericAmount: number;
	title: string;
	fileId: string;
	accessLevel: string;
	icon: string;
	isGrand?: boolean;
}

const prizes: PrizeCardData[] = [
	{
		amount: "3K",
		numericAmount: 3000,
		title: "MAIN_FRAME_CHAMP",
		fileId: "#FILE_001",
		accessLevel: "ACCESS_LEVEL: ALPHA",
		icon: "images/prize-icon-1.png",
	},
	{
		amount: "5K",
		numericAmount: 5000,
		title: "GRAND_SYS_ADMIN",
		fileId: "#SYSTEM_ROOT",
		accessLevel: "TOTAL_POOL_RESERVE",
		icon: "images/prize-icon-2.png",
		isGrand: true,
	},
	{
		amount: "2K",
		numericAmount: 2000,
		title: "NEURAL_EXPLORER",
		fileId: "#FILE_003",
		accessLevel: "ACCESS_LEVEL: BETA",
		icon: "images/prize-icon-3.png",
	},
];

function PrizeCard({ prize, index }: { prize: PrizeCardData; index: number }) {
	const amountRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const inView = useInView(cardRef, { once: true, margin: "-80px" });

	useEffect(() => {
		if (!inView || !amountRef.current) return;
		const el = amountRef.current;
		const suffix = prize.amount.replace(/\d+/g, "");
		const target = { val: 0 };

		gsap.to(target, {
			val: prize.numericAmount / 1000,
			duration: prize.isGrand ? 1.8 : 1.2,
			ease: "power2.out",
			delay: index * 0.15,
			onUpdate: () => {
				el.textContent = Math.round(target.val) + suffix;
			},
		});
	}, [inView, prize.numericAmount, prize.amount, prize.isGrand, index]);

	return (
		<motion.div
			ref={cardRef}
			custom={index}
			variants={boltOnReveal}
			initial="hidden"
			animate={inView ? "visible" : "hidden"}
			whileHover={{ y: -8, transition: { duration: 0.2 } }}
			className={`
        border-4 border-hack-black h-80 md:h-[404px] relative
        transition-transform
        ${prize.isGrand ? "bg-hack-red shadow-[10px_10px_0px_#000] md:shadow-[15px_15px_0px_#000]" : "bg-hack-yellow"}
      `}
		>
			{/* HUD bracket — top left */}
			<div className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-hack-black" />
			{/* HUD bracket — bottom right */}
			<div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 border-hack-black" />

			{/* Top row: icon + file ID */}
			<div className="absolute top-6 md:top-10 left-6 md:left-10 right-6 md:right-10 flex justify-between items-start">
				<motion.img
					src={prize.icon}
					alt=""
					className="h-8 md:h-[50px] w-auto opacity-90"
					variants={popIn}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
				/>
				{prize.isGrand ? (
					<div className="bg-white px-2 py-0.5">
						<span className="font-mono font-bold text-[10px] md:text-xs text-hack-black">{prize.fileId}</span>
					</div>
				) : (
					<span className="font-mono text-[10px] md:text-xs text-black/40">{prize.fileId}</span>
				)}
			</div>

			{/* Amount */}
			<div className="absolute top-28 md:top-[148px] left-6 md:left-10 right-6 md:right-10">
				<div
					ref={amountRef}
					className={`font-display font-bold text-5xl sm:text-6xl md:text-[7vw] lg:text-8xl leading-none
            ${prize.isGrand ? "text-white" : "text-hack-black"}`}
				>
					{prize.amount}
				</div>
			</div>

			{/* Title */}
			<div className="absolute top-48 md:top-[260px] left-6 md:left-10 right-6 md:right-10">
				<div
					className={`font-body font-black text-[10px] sm:text-xs md:text-sm lg:text-base tracking-widest uppercase
          ${prize.isGrand ? "text-white" : "text-hack-black"}`}
				>
					{prize.title}
				</div>
			</div>

			{/* Access level */}
			<div className="absolute top-60 md:top-[320px] left-6 md:left-10 right-6 md:right-10">
				{prize.isGrand ? (
					<div className="bg-hack-black inline-block px-3 md:px-4 py-1.5 md:py-2">
						<span className="font-body font-black text-[10px] md:text-sm text-hack-yellow uppercase">{prize.accessLevel}</span>
					</div>
				) : (
					<div className="border-t-2 border-black/20 pt-3 md:pt-[18px]">
						<span className="font-mono text-[10px] md:text-xs text-black/60">{prize.accessLevel}</span>
					</div>
				)}
			</div>
		</motion.div>
	);
}

export default function PrizePool() {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			ref={ref}
			id="prize-pool"
			className="bg-white border-t-[8px] md:border-t-[16px] border-b-[8px] md:border-b-[16px] border-hack-black
        py-16 md:py-28 px-4 md:px-6"
		>
			<div className="max-w-7xl w-full mx-auto">
				{/* Heading row */}
				<div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-20 gap-4">
					<motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.12 }}>
						<h2
							className="font-display font-bold text-[40px] sm:text-[60px] md:text-[9vw] lg:text-[120px] xl:text-[160px]
              leading-none tracking-tighter uppercase text-hack-black"
						>
							REWARD_FILES
						</h2>
					</motion.div>

					{/* Encryption metadata */}
					<div className="font-mono text-[10px] md:text-xs text-black/50 md:text-right leading-relaxed pb-2 md:pb-4 shrink-0">
						<div>ENCRYPTION:</div>
						<div>AES_256</div>
						<div>SOURCE:</div>
						<div>CENTRAL_VAULT</div>
					</div>
				</div>

				{/* Prize cards grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{prizes.map((prize, i) => (
						<PrizeCard key={prize.title} prize={prize} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
