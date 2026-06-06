import { 
  AboutBanner,
  AboutIntro,
  AboutLead, 
  AboutAdvantages,
  AboutTestimonials,
  AboutStats, 
} from "./components";

export const About = () => {
  return (
    <div className="about">
      <AboutBanner>
        <AboutIntro />
        <AboutLead />
        <AboutAdvantages />
      </AboutBanner>

      <AboutTestimonials />
      <AboutStats />
    </div>
  );
};