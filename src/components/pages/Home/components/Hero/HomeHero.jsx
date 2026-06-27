import { WrapBanner } from "@blocks";

export const HomeHero = () => {
  const createTitle = () => {
    return (
      <>
        <span className="block-text">That's a</span>
        <span className="block-text">Wrap 2025</span>
      </>
    );
  };

  return (
    <WrapBanner 
      className="home-hero"
      title={createTitle()}
      subtitle="The best (and worst) of the year from TMDB."
      linkContent="Check it out"
      linkAriaLabel="TMDB 2025 Year in Review"
      linkTo="https://www.themoviedb.org/2025"
      linkTarget="_blank"
    />
  );
};
