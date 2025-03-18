"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-pink-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
