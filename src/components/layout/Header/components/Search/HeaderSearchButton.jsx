import { Button, Icon } from "@shared";
import "./styles/HeaderSearchButton.scss";

export const HeaderSearchButton = () => {
  return (
      <Button
        className="header-search-button"
        variant="ghost"
        theme="light"
      >
        <Icon className="header-search-button__icon" name="search" />
      </Button>
  );
};
