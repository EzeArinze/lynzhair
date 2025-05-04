"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SocialContact } from "@/lib/constant/constant";

export function CtaSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Join thousands of satisfied customers who have elevated their style
            with Lynnhairz premium quality extensions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 text-lg"
            >
              <Link href="/">
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-6 text-lg"
                >
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md w-[90%] overflow-y-auto rounded hide-scrollbar">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl">
                    Get in Touch
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Connect with us on your preferred platform
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  {SocialContact.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                      onClick={() => setOpen(false)}
                      className={`flex items-center p-4 rounded-lg border border-gray-200 transition-colors ${item.className}`}
                    >
                      <div
                        className={`w-12 h-12 ${item.iconBg} rounded-full flex items-center justify-center mr-4`}
                      >
                        <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {item.platform}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.label}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="text-center text-sm text-gray-500 mt-2">
                  You can also email us at{" "}
                  <a
                    href="mailto:support@Lynnhairz.com"
                    className="text-pink-600 hover:underline"
                  >
                    support@Lynnhairz.com
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
