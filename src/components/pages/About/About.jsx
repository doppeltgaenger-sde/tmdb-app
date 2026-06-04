import { 
  AboutBanner,
  AboutIntro,
  AboutLead, 
  AboutAdvantages,
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

      <AboutStats />
    </div>
  );
};