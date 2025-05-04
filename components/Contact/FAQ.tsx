import React from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

function FAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-8">
            Can&apos;t find what you&apos;re looking for? Reach out to us
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
                question: "What is your return policy?",
                answer:
                  "We offer a 30-day return policy for unused, unopened items in their original packaging. Custom orders are final sale.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <Button
            asChild
            className="mt-10 bg-pink-600 hover:bg-pink-700 text-white"
          >
            <a
              href="https://wa.me/08066912768"
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
  );
}

export default FAQ;
