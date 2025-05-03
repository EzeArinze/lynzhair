"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  // location: string;
  image: string;
  quote: string;
  index: number;
}

export function TestimonialCard({
  name,
  // location,
  image,
  quote,
  index,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-50 rounded-lg p-6 shadow-md"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          {/* <p className="text-gray-500 text-sm">{location}</p> */}
        </div>
      </div>
      <p className="text-gray-700 italic">`${quote}&quot;`</p>
    </motion.div>
  );
}
