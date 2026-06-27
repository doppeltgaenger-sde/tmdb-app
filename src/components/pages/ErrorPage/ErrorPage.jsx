import { WrapBanner } from "@blocks";
import "./styles/ErrorPage.scss";

export const ErrorPage = () => {
  return (
    <WrapBanner 
      className="error-page"
      title="404"
      subtitle="Oops! Page Not Found"
      linkContent="Back to Home"
      linkAriaLabel="TMDB Home"
      linkTo="/"
    />
  );
};

