"use client";

import { useState } from "react";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { contactCards } from "@/lib/constant/conatant";

// Define the contact card data structure

export default function ContactPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Contact cards data

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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mb-8">
                Can&agos;t find what you&agos;re looking for? Reach out to us
                directly.
              </p>

              <div className="text-left space-y-6">
                {[
                  {
                    question: "What are your shipping times?",
                    answer:
                      "We process orders within 1-2 business days. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.",
                  },
                  {
                    question: "Do you offer international shipping?",
                    answer:
                      "Yes, we ship worldwide. International shipping typically takes 7-14 business days depending on the destination.",
                  },
                  {
                    question: "What is your return policy?",
                    answer:
                      "We offer a 30-day return policy for unused, unopened items in their original packaging. Custom orders are final sale.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="font-semibold text-lg mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="mt-10 bg-pink-600 hover:bg-pink-700 text-white"
              >
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Ask a Question
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
