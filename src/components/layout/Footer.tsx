import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { brutalistEntrance } from "../../lib/animations";

export default function Footer() {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-80px" });

	const socials = [
		{ label: "X_PROTOCOL", href: "#" },
		{ label: "INSTA_SYNC", href: "#" },
		{ label: "DISCORD_NODE", href: "#" },
	];

	return (
		<footer ref={ref} className="bg-hack-black border-t-[12px] border-hack-red pt-16 md:pt-24 pb-10 px-4 md:px-10 overflow-hidden relative">
			{/* Main row */}
			<div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 mb-12 md:mb-20">
				{/* Left: brand */}
				<div className="lg:col-span-6 relative self-end">
					{/* Ghost CYBER text */}
					<div
						className="absolute top-0 -left-4 font-body font-black text-white/5 leading-[0.85] tracking-tight select-none pointer-events-none
            text-[80px] sm:text-[120px] md:text-[16vw] xl:text-[240px]"
          >
            HACKFEST
          </div>

					<div className="relative pt-28 md:pt-56">
						<motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
							<motion.div custom={0} variants={brutalistEntrance}>
								<div className="font-mono text-xs md:text-sm tracking-[0.4em] text-hack-red uppercase mb-3">SYSTEM_DIAGNOSTIC_LOG_V2.0.4_STABLE</div>
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Right: socials + info box */}
				<div className="lg:col-span-6 flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 items-start sm:items-end sm:justify-end">
					{/* Vertical social links */}
					<div className="flex flex-row sm:flex-row gap-6 sm:gap-8 lg:gap-12 items-end">
						{socials.map((social) => (
							<a
								key={social.label}
								href={social.href}
								className="sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180
                  font-body font-black text-xs sm:text-sm tracking-widest text-hack-yellow uppercase whitespace-nowrap
                  hover:text-hack-red transition-colors duration-50"
							>
								{social.label}
							</a>
						))}
					</div>

					{/* Info box */}
					<div className="bg-hack-red border-4 border-hack-red p-5 md:p-7 shrink-0">
						<div className="font-mono text-[10px] md:text-xs text-white leading-relaxed uppercase">
							<div>SECURE_ENCRYPTION_ENABLED</div>
							<div>256_BIT_AES_CONNECTED</div>
							<div>LOCATION: [ REDACTED ]</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom row: Logos */}
			<div className="mt-16 md:mt-24 flex justify-between items-center">
				<img src="images/tech soc.png" alt="Tech Soc" className="h-12 md:h-16 lg:h-20 w-auto opacity-70 hover:opacity-100 transition-opacity" />
				<img src="images/outr.png" alt="OUTR Seal" className="h-14 md:h-20 lg:h-24 w-auto opacity-70 hover:opacity-100 transition-opacity" />
			</div>
		</footer>
	);
}
