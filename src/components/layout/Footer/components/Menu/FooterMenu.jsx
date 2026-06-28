import { Link } from "react-router-dom";
import { Button } from "@shared";
import "./styles/FooterMenu.scss";
import { MENU_ITEMS } from "./data/menuItems";

export const FooterMenu = () => {
  return (
    <nav className="footer-menu">
      {MENU_ITEMS.map((item, index) => {
        return (
          <div className="footer-menu__item" key={index}>
            <h3 className="footer-menu__label">{item.label}</h3>

            <div className="footer-menu__dropdown">
              {item.submenu.map((subItem) => (
                <Button 
                  className="footer-menu__dropdown-button" 
                  key={subItem.to}
                  as={Link}
                  to={subItem.to}
                  variant="ghost"
                  theme="light"
                  aria-label={subItem.aria}
                >
                  {subItem.label}
                </Button>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
};
