import { ConnectButton } from "thirdweb/react";
import { motion } from "framer-motion";
import { client } from "./client";
import { ArrowDownIcon, SparklesIcon, ShieldCheckIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import React from "react";
import Aurora from "./components/Aurora";

export function App() {
	return (
		<div className="min-h-screen bg-black text-white overflow-hidden relative">
			{/* Aurora Background */}
			<div className="fixed inset-0 z-0">
				<Aurora
					colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
					blend={0.5}
					amplitude={1.0}
					speed={0.5}
				/>
			</div>

			{/* Navigation Bar */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-purple-500/20">
				<div className="container mx-auto px-8 py-6">
					<div className="flex items-center justify-between">
						<motion.a 
							href="/"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1 }}
							className="text-purple-500 tracking-[0.2em] text-base font-medium w-[250px]"
						>
							EDUCHAIN
						</motion.a>
						<div className="flex-1 flex items-center justify-center">
							<div className="flex items-center space-x-20">
								<a href="#features" className="nav-link text-base">FEATURES</a>
								<a href="#about" className="nav-link text-base">ABOUT</a>
								<a href="#partners" className="nav-link text-base">PARTNERS</a>
							</div>
						</div>
						<div className="w-[250px]"></div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center max-w-5xl mx-auto z-10"
				>
					<motion.h1 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-6xl md:text-8xl font-light mb-6 leading-tight tracking-tight"
					>
						PURE INNOVATION
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">NEW GENERATION</span>
					</motion.h1>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light tracking-wide"
					>
						Experience the future of decentralized technology with our next-generation blockchain platform
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="flex flex-wrap gap-6 justify-center"
					>
						<ConnectButton
							client={client}
							appMetadata={{
								name: "Synthack",
								url: "https://synthack.tech",
							}}
						/>
						<button className="button-secondary">
							EXPLORE
						</button>
					</motion.div>
				</motion.div>

				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
				>
					<ArrowDownIcon className="h-8 w-8 text-purple-500 pulse" />
				</motion.div>
			</section>

			{/* Features Section */}
			<section id="features" className="relative py-32 px-4">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1 }}
						className="grid md:grid-cols-3 gap-8"
					>
						<FeatureCard
							icon={<SparklesIcon className="h-12 w-12 text-purple-500" />}
							title="ADVANCED TECHNOLOGY"
							description="Next-generation blockchain infrastructure built for the future"
						/>
						<FeatureCard
							icon={<ShieldCheckIcon className="h-12 w-12 text-purple-500" />}
							title="MAXIMUM SECURITY"
							description="Enterprise-grade protection for your digital assets"
						/>
						<FeatureCard
							icon={<RocketLaunchIcon className="h-12 w-12 text-purple-500" />}
							title="INFINITE SCALABILITY"
							description="Built to handle millions of transactions with ease"
						/>
					</motion.div>
				</div>
			</section>

			{/* Integration Section */}
			<section id="partners" className="relative py-32 px-4 overflow-hidden">
				<motion.div 
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto text-center"
				>
					<h2 className="text-sm tracking-[0.2em] text-purple-500 mb-12">
						TRUSTED BY INDUSTRY LEADERS
					</h2>
					<div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-70">
						<div className="h-12 w-32 bg-purple-500/5 rounded-none border border-purple-500/20 hover:border-purple-500 transition-all duration-300"></div>
						<div className="h-12 w-32 bg-purple-500/5 rounded-none border border-purple-500/20 hover:border-purple-500 transition-all duration-300"></div>
						<div className="h-12 w-32 bg-purple-500/5 rounded-none border border-purple-500/20 hover:border-purple-500 transition-all duration-300"></div>
						<div className="h-12 w-32 bg-purple-500/5 rounded-none border border-purple-500/20 hover:border-purple-500 transition-all duration-300"></div>
					</div>
				</motion.div>
			</section>
		</div>
	);
}

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
			whileHover={{ scale: 1.02 }}
			className="p-8 rounded-none border border-purple-500/20 hover:border-purple-500 transition-all duration-300 bg-purple-500/5"
		>
			<div className="mb-6">{icon}</div>
			<h3 className="text-lg font-light tracking-[0.2em] mb-4 text-purple-500">{title}</h3>
			<p className="text-gray-400 leading-relaxed font-light">{description}</p>
		</motion.div>
	);
}
