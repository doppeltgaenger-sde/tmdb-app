import { Link } from "react-router-dom";
import { useViewport } from "@hooks";
import { Button, Icon } from "@shared";
import "./styles/HeaderLoginButton.scss";

export const HeaderLoginButton = () => {
  const { isMobileLg } = useViewport();

  const buttonContent = isMobileLg ? (
    <Icon className="header-login-button__icon" name="profile-placeholder" />
  ) : (
    "Login"
  );

  return (
      <Button
        className="header-login-button"
        as={Link} 
        to="/"
        variant="ghost"
        theme="light"
        aria-label="Join TMDB official site"
      > 
        {buttonContent}
      </Button>
  );
};
