import { useDocumentTitle } from "@hooks";
import { 
  AboutBanner,
  AboutIntro,
  AboutLead, 
  AboutAdvantages,
  AboutTestimonials,
  AboutStats, 
} from "./components";

export const About = () => {
  useDocumentTitle("About TMDB");

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