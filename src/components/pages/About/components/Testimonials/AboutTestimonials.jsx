import { Slider } from "@shared";
import { TestimonialCard } from "./TestimonialCard";
import { testimonialsData } from "./data/testimonialsData";
import "./styles/AboutTestimonials.scss";

export const AboutTestimonials = () => {
  return (
    <section className="about-testimonials">
      <div className="container">
        <div className="about-testimonials__body">
          <Slider 
            variant="dots"
            options={{
              dragFree: false,
              slidesToScroll: 1,
              containScroll: false,
              align: "center",
            }}
          >
            {testimonialsData.map((item) => (
              <TestimonialCard 
                key={item.name}
                {...item} 
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
