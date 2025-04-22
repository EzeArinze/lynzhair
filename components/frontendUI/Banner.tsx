import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

// https://res.cloudinary.com/dsvpedluw/image/upload/f_webp/ik1fu6zwuwy4pueeioav

export function Banner() {
  return (
    <section className="relative">
      <div className="h-[400px] md:h-[500px]  relative overflow-hidden rounded-lg">
        <Image
          src="/BannerImage.webp"
          alt="Premium Quality Hair Extensions"
          fill
          priority
          className="object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Premium Quality Hair Extensions
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Elevate your look with our luxury hair collections. 100% virgin
                human hair.
              </p>
              <Badge className="bg-pink-600 hover:bg-pink-700 text-white p-2">
                Shop with us today
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
