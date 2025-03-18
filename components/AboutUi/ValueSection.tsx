"use client";

import { motion } from "framer-motion";
import { Heart, Award, CheckCircle } from "lucide-react";
import { ValueCard } from "./ValueCard";

// Values data
const values = [
  {
    icon: Heart,
    title: "Passion for Quality",
    description:
      "We're passionate about providing only the finest quality virgin human hair that looks natural and lasts longer.",
  },
  {
    icon: Award,
    title: "Ethical Sourcing",
    description:
      "We ensure all our hair is ethically sourced with fair compensation to donors and transparent supply chains.",
  },
  {
    icon: CheckCircle,
    title: "Customer Satisfaction",
    description:
      "Your satisfaction is our priority. We stand behind every product with our quality guarantee and responsive support.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-700">
            At LynzHair, our values guide everything we do, from sourcing the
            finest quality hair to providing exceptional customer service.
          </p>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
