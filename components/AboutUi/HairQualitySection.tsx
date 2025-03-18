import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HairQualitySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Premium Quality Hair
          </h2>
          <p className="text-gray-700">
            Discover what sets LynzHair apart and why our customers trust us for
            their hair extension needs.
          </p>
        </div>

        <Tabs defaultValue="quality" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quality">Quality Standards</TabsTrigger>
            <TabsTrigger value="sourcing">Ethical Sourcing</TabsTrigger>
          </TabsList>
          <TabsContent
            value="quality"
            className="mt-6 p-6 bg-gray-50 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Our Quality Promise
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      100% virgin human hair, unprocessed and chemical-free
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Cuticles aligned in one direction to prevent tangling
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Double-weft construction for durability and minimal
                      shedding
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Rigorous quality control with multiple inspection points
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Can be colored, styled, and treated like your natural hair
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/200/300?random=1?grayscale"
                  alt="LynzHair Quality"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="sourcing"
            className="mt-6 p-6 bg-gray-50 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/200/300?random=1?grayscale"
                  alt="Ethical Hair Sourcing"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Ethical Sourcing Practices
                </h3>
                <p className="text-gray-700 mb-4">
                  We believe in transparency and ethical practices throughout
                  our supply chain. Our hair is sourced from verified suppliers
                  who:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Ensure fair compensation to hair donors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Maintain ethical collection practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Provide documentation of origin and processing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Comply with international trade standards</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
