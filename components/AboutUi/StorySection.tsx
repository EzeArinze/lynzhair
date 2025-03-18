"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function StorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              The LynzHair Journey
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2015 by hair enthusiast and beauty expert Lynda
              Johnson, LynzHair began with a simple mission: to provide women
              with premium quality hair extensions that enhance their natural
              beauty and boost their confidence.
            </p>
            <p className="text-gray-700 leading-relaxed">
              What started as a small online boutique has grown into a trusted
              brand serving customers worldwide. Our journey has been driven by
              a passion for quality, a commitment to ethical sourcing, and the
              joy of seeing our clients transform with our products.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, LynzHair stands as a symbol of excellence in the hair
              extension industry, offering a diverse range of premium virgin
              human hair products that cater to all textures, lengths, and
              styling preferences.
            </p>
            <div className="pt-4">
              <Button
                asChild
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                <Link href="/">Explore Our Collections</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="https://picsum.photos/200/300?random=1?grayscale"
              alt="LynzHair Journey"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
