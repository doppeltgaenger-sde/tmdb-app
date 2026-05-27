import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/HeaderMenuDesktop.scss";
import { MENU_ITEMS } from "./data/menuItems";

export const HeaderMenuDesktop = () => {
  return (
    <nav className="header-menu-desktop">
      {MENU_ITEMS.map((item, index) => {
        const hasSubmenu = Boolean(item.submenu);

        return (
          <div className="header-menu-desktop__item" key={index}>
            <Button
              className={classNames([
                "header-menu-desktop__button", 
                hasSubmenu && "header-menu-desktop__button--trigger"
              ])}
              as={item.as}
              to={item.to}
              variant="ghost"
              theme="light"
              aria-label={item.aria}
            >
              {item.label}
            </Button>

            {hasSubmenu && (
              <div className="header-menu-desktop__dropdown">
                {item.submenu.map((subItem) => (
                  <Button 
                    className="header-menu-desktop__dropdown-button" 
                    key={subItem.to}
                    as={Link}
                    to={subItem.to}
                    variant="ghost"
                    aria-label={subItem.aria}
                  >
                    {subItem.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
