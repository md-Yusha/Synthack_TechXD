import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { client } from "./client";
import {
	ArrowDownIcon,
	SparklesIcon,
	ShieldCheckIcon,
	RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import Aurora from "./components/Aurora";
import Squares from "./components/Squares";
import Orb from "./components/Orb";
import DecryptedText from "./components/DecryptedText";

export function App() {
	const [showAurora, setShowAurora] = useState(true);
	const { scrollY } = useScroll();
	const account = useActiveAccount();
	const opacity = useTransform(
		scrollY,
		[0, window.innerHeight * 0.5],
		[1, 0]
	);

	useEffect(() => {
		const handleScroll = () => {
			const heroSection = document.getElementById("hero");
			if (heroSection) {
				const rect = heroSection.getBoundingClientRect();
				const isVisible =
					rect.top >= -window.innerHeight * 0.5 &&
					rect.bottom <= window.innerHeight * 1.5;
				setShowAurora(isVisible);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="min-h-screen bg-black text-white overflow-hidden relative">
			{/* Global Squares Background */}
			<div className="fixed inset-0 z-0">
				<Squares 
					speed={0.3}
					squareSize={50}
					direction="diagonal"
					borderColor="rgba(63, 81, 181, 0.1)"
					hoverFillColor="rgba(63, 81, 181, 0.05)"
				/>
			</div>

			{/* Aurora Background */}
			<motion.div 
				className="fixed inset-0 z-0"
				style={{ opacity }}
			>
				<Aurora
					colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
					blend={0.5}
					amplitude={1.0}
					speed={0.5}
					visible={showAurora}
				/>
			</motion.div>

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
						<div className="w-[250px] flex justify-end">
							{account && (
								<ConnectButton
									client={client}
									appMetadata={{
										name: "Synthack",
										url: "https://synthack.tech",
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24">
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
						{!account && (
							<ConnectButton
								client={client}
								appMetadata={{
									name: "Synthack",
									url: "https://synthack.tech",
								}}
							/>
						)}
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
							title="ACADEMIC PASSPORT"
							description={
								<DecryptedText
									text="A secure digital wallet for students to store and manage their academic credentials with complete control and portability."
									animateOn="view"
									revealDirection="center"
									className="text-gray-400"
									encryptedClassName="text-gray-600"
									speed={30}
									maxIterations={8}
								/>
							}
						/>
						<FeatureCard
							icon={<ShieldCheckIcon className="h-12 w-12 text-purple-500" />}
							title="TAMPER-PROOF SECURITY"
							description={
								<DecryptedText
									text="Blockchain-powered verification with cryptographic signatures ensuring 100% credential authenticity and integrity."
									animateOn="view"
									revealDirection="center"
									className="text-gray-400"
									encryptedClassName="text-gray-600"
									speed={30}
									maxIterations={8}
								/>
							}
						/>
						<FeatureCard
							icon={<RocketLaunchIcon className="h-12 w-12 text-purple-500" />}
							title="INSTANT VERIFICATION"
							description={
								<DecryptedText
									text="Reduce verification time by 89% with our 24/7 automated credential verification system."
									animateOn="view"
									revealDirection="center"
									className="text-gray-400"
									encryptedClassName="text-gray-600"
									speed={30}
									maxIterations={8}
								/>
							}
						/>
					</motion.div>
				</div>
			</section>
			{/* About Section */}
			<section id="about" className="relative py-32 px-4 overflow-hidden">
				<motion.div 
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto text-center"
				>
					<h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">About EduChain</h2>
					<p className="text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
						EduChain is a revolutionary blockchain-based academic credential verification system that transforms how educational institutions issue, manage, and verify academic credentials. Our platform reduces verification time by 89% and administrative costs by 82%, while ensuring tamper-proof security through advanced blockchain technology.
					</p>
					<div className="grid md:grid-cols-3 gap-8 text-left">
						<div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-lg">
							<h3 className="text-purple-500 font-light mb-3">Publisher Tool</h3>
							<p className="text-gray-400 text-sm">Enables institutions to issue secure digital credentials with cryptographic signatures.</p>
						</div>
						<div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-lg">
							<h3 className="text-purple-500 font-light mb-3">Academic Passport</h3>
							<p className="text-gray-400 text-sm">Students' digital wallet for managing and sharing their verified credentials.</p>
						</div>
						<div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-lg">
							<h3 className="text-purple-500 font-light mb-3">Verification Portal</h3>
							<p className="text-gray-400 text-sm">24/7 instant verification platform for employers and institutions.</p>
						</div>
					</div>
				</motion.div>
			</section>

			{/* Team Section */}
			<section id="partners" className="relative py-32 px-4 overflow-hidden">
				<motion.div 
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-6xl mx-auto text-center"
				>
					<h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">Meet Our Team</h2>
					<p className="text-gray-400 mb-12 max-w-2xl mx-auto">
						The innovative minds behind EduChain's blockchain revolution
					</p>
					<div className="relative w-full h-[800px] flex items-center justify-center">
						<div className="relative w-[700px] h-[700px]">
							<div className="absolute inset-0">
								<Orb
									hoverIntensity={0.8}
									rotateOnHover={true}
									hue={240}
									forceHoverState={false}
								/>
							</div>

							<motion.div 
								className="absolute inset-0"
								animate={{ rotate: 360 }}
								transition={{ 
									duration: 30,
									repeat: Infinity,
									ease: "linear"
								}}
							>
								{/* Team member components */}
								<TeamMember 
									position="top"
									name="Likith"
									image="https://media.licdn.com/dms/image/v2/D4D03AQH-jGdrNyBaOQ/profile-displayphoto-shrink_400_400/B4DZOPaWyNHMAk-/0/1733277884553?e=1749686400&v=beta&t=KLkNnNTGhcuibyjup2oKiCqKSXaq9Wmdg8xC14t9oVw"
								/>
								<TeamMember 
									position="right"
									name="Yusha"
									image="https://media.licdn.com/dms/image/v2/D5603AQHTzBVD38cS_w/profile-displayphoto-shrink_400_400/B56ZOSO4GeGsAk-/0/1733325194494?e=1749686400&v=beta&t=DGM3qsCqrltG1g8m5Cy1kpaw-0U3j8jB6hUsYDxKQWs"
								/>
								<TeamMember 
									position="bottom"
									name="Ayan"
									image="https://i.postimg.cc/05KbJhwD/Whats-App-Image-2025-04-11-at-15-33-54-b6f606de.jpg"
								/>
								<TeamMember 
									position="left"
									name="Suhas"
									image="https://media.licdn.com/dms/image/v2/D5603AQFDaxP6s-6CaQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1702226478191?e=1749686400&v=beta&t=Tlc9clA-jDzBOHcEDqHWz_TDeNSJXtdEu2qSeFjGtfk"
								/>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</section>
		</div>
	);
}

interface TeamMemberProps {
	position: 'top' | 'right' | 'bottom' | 'left';
	name: string;
	image: string;
}

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: React.ReactNode;
}

function TeamMember({ position, name, image }: TeamMemberProps) {
	const positionClasses = {
		top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
		right: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
		bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
		left: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2'
	};

	return (
		<motion.div 
			className={`absolute ${positionClasses[position]} z-10`}
			animate={{ rotate: -360 }}
			transition={{ 
				duration: 30,
				repeat: Infinity,
				ease: "linear"
			}}
		>
			<div className="flex flex-col items-center space-y-3">
				<div className="h-32 w-32 rounded-full bg-purple-500/10 border-2 border-purple-500/20 overflow-hidden">
					<img 
						src={image}
						alt={name}
						className="w-full h-full object-cover"
					/>
				</div>
				<span className="text-purple-500 font-light text-sm bg-black/50 px-3 py-1 rounded-full">
					{name}
				</span>
			</div>
		</motion.div>
	);
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
			<div className="leading-relaxed font-light">{description}</div>
		</motion.div>
	);
}
