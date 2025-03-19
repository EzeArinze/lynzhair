"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, MessageCircle, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
            with LynzHair&aqos;s premium quality extensions.
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
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl">
                    Get in Touch
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Connect with us on your preferred platform
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">WhatsApp</h3>
                      <p className="text-gray-600 text-sm">
                        Quick responses during business hours
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://facebook.com/lynzhair"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Facebook className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Facebook</h3>
                      <p className="text-gray-600 text-sm">
                        Message us or join our community
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/lynzhair"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-pink-50 hover:border-pink-200 transition-colors"
                  >
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                      <Instagram className="h-6 w-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Instagram</h3>
                      <p className="text-gray-600 text-sm">
                        DM us or explore our latest styles
                      </p>
                    </div>
                  </a>
                </div>
                <div className="text-center text-sm text-gray-500 mt-2">
                  You can also email us at{" "}
                  <a
                    href="mailto:support@lynzhair.com"
                    className="text-pink-600 hover:underline"
                  >
                    support@lynzhair.com
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
