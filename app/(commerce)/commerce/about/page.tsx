import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const StorySection = dynamic(() =>
  import("@/components/AboutUi/StorySection").then((mod) => mod.StorySection)
);

const ValuesSection = dynamic(() =>
  import("@/components/AboutUi/ValueSection").then((mod) => mod.ValuesSection)
);

const HairQualitySection = dynamic(() =>
  import("@/components/AboutUi/HairQualitySection").then(
    (mod) => mod.HairQualitySection
  )
);

const TestimonialsSection = dynamic(() =>
  import("@/components/AboutUi/TestimonialSection").then(
    (mod) => mod.TestimonialsSection
  )
);

const CtaSection = dynamic(
  () => import("@/components/AboutUi/CTASection").then((mod) => mod.CtaSection),
  {
    loading: () => (
      <div className="py-16 bg-pink-50">Loading CTA section...</div>
    ),
  }
);

function AboutPage() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex-1">
        {/* Story Section */}
        <Suspense
          fallback={
            <div className="py-16 bg-white">Loading story section...</div>
          }
        >
          <StorySection />
        </Suspense>

        {/* Values Section */}
        <Suspense
          fallback={
            <div className="py-16 bg-gray-50">Loading values section...</div>
          }
        >
          <ValuesSection />
        </Suspense>

        {/* Hair Quality Section */}
        <Suspense
          fallback={
            <div className="py-16 bg-white">
              Loading hair quality section...
            </div>
          }
        >
          <HairQualitySection />
        </Suspense>

        {/* Testimonials Section */}
        <Suspense
          fallback={
            <div className="py-16 bg-white">
              Loading testimonials section...
            </div>
          }
        >
          <TestimonialsSection />
        </Suspense>

        {/* CTA Section */}
        <Suspense
          fallback={
            <div className="py-16 bg-pink-50">Loading CTA section...</div>
          }
        >
          <CtaSection />
        </Suspense>
      </div>
    </section>
  );
}

export default AboutPage;
