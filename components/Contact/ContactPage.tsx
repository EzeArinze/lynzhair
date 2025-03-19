"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { contactCards } from "@/lib/constant/conatant";
import dynamic from "next/dynamic";
const FAQ = dynamic(() => import("@/components/Contact/FAQ"), {
  ssr: false,
});

export default function ContactPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex-1">
        {/* Contact Options Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Connect With Us
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {contactCards.map((card) => (
                  <motion.a
                    key={card.id}
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center p-8 rounded-xl border border-gray-200 ${card.hoverBorderColor} hover:shadow-lg transition-all`}
                    whileHover={{ y: -5 }}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`w-16 h-16 ${card.bgColor} rounded-full flex items-center justify-center mb-4`}
                    >
                      <card.icon className={`h-8 w-8 ${card.textColor}`} />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-center mb-4">
                      {card.description}
                    </p>
                    <p className={`font-medium ${card.textColor}`}>
                      {card.contact}
                    </p>
                    <div
                      className={`mt-4 flex items-center ${
                        card.textColor
                      } transition-opacity duration-300 ${
                        hoveredCard === card.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="mr-2">
                        {card.id === "whatsapp"
                          ? "Chat now"
                          : card.id === "facebook"
                          ? "Visit page"
                          : "Follow us"}
                      </span>
                      <ArrowRight size={16} />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Email Contact */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-2">Prefer email?</p>
                <a
                  href="mailto:support@lynzhair.com"
                  className="inline-flex items-center text-pink-600 font-medium hover:underline"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  support@lynzhair.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </section>
  );
}
