import { TestimonialCard } from "./TestimonialCard";

// Testimonials data
const testimonials = [
  {
    name: "Jessica R.",
    location: "New York, NY",
    image: "https://picsum.photos/id/237/200/300",
    quote:
      "LynzHair extensions have completely transformed my look. The quality is unmatched - my stylist even asked where I got them from because they blend so perfectly with my natural hair!",
  },
  {
    name: "Tasha W.",
    location: "Atlanta, GA",
    image: "https://picsum.photos/id/237/200/300",
    quote:
      "After trying countless brands, I've finally found my go-to with LynzHair. The Brazilian Body Wave bundles hold curl beautifully and the customer service is exceptional.",
  },
  {
    name: "Monique L.",
    location: "Los Angeles, CA",
    image: "https://picsum.photos/id/237/200/300",
    quote:
      "As a professional stylist, I recommend LynzHair to all my clients. The quality and consistency of their products make my job easier and my clients happier.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-700">
            Don&apos;t just take our word for it. Hear from the women who have
            transformed their look with LynzHair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              // location={testimonial.location}
              image={testimonial.image}
              quote={testimonial.quote}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
