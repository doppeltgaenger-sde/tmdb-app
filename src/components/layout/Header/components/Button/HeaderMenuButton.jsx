import { classNames } from "@utils";
import { Button, Icon } from "@shared";
import "./styles/HeaderMenuButton.scss";

export const HeaderMenuButton = ({ isOpen, onClick }) => {
  return (
    <Button
      className={classNames([
        "header-menu-button",
        isOpen && "header-menu-button--active"
      ])}
      variant="ghost"
      theme="light"
      onClick={onClick}
      aria-expanded={isOpen}
    > 
      <Icon 
        className="header-menu-button__icon header-menu-button__icon--top" 
        name="menu-pill" 
      />

      <Icon 
        className="header-menu-button__icon header-menu-button__icon--middle" 
        name="menu-pill" 
      />

      <Icon 
        className="header-menu-button__icon header-menu-button__icon--bottom" 
        name="menu-pill" 
      />
    </Button>
  );
};
