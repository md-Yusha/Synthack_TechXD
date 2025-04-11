import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
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
      <h3 className="text-lg font-light tracking-[0.2em] mb-4 text-purple-500">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}
