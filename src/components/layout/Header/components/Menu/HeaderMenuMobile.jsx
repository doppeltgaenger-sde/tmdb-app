import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/HeaderMenuMobile.scss";
import { MENU_ITEMS } from "./data/menuItems";

export const HeaderMenuMobile = ({ isOpen, onClose }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveSubmenu(null);
    }
  }, [isOpen]);

  const handleTriggerClick = (label) => {
    setActiveSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <div 
      className={classNames([
        "header-menu-mobile", 
        isOpen && "header-menu-mobile--open"
      ])}
    >
      <div className="header-menu-mobile__overlay" onClick={onClose} />

      <div className="header-menu-mobile__body">
        <div className="header-menu-mobile__handle" onClick={onClose} />

        <nav className="header-menu-mobile__items">
          {MENU_ITEMS.map((item, index) => {
            const hasSubmenu = Boolean(item.submenu);
            const isSubmenuOpen = activeSubmenu === item.label;

            return (
              <div className="header-menu-mobile__item" key={index}>
                <Button
                  className={classNames([
                    "header-menu-mobile__button", 
                    hasSubmenu && "header-menu-mobile__button--trigger",
                  ])}
                  as={item.as}
                  to={item.to}
                  variant="ghost"
                  theme="light"
                  onClick={item.as === Link ? onClose : () => handleTriggerClick(item.label)}
                  aria-label={item.aria}
                  aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
                >
                  {item.label}
                </Button>

                {hasSubmenu && (
                  <div 
                      className={classNames([
                        "header-menu-mobile__dropdown",
                        isSubmenuOpen && "header-menu-mobile__dropdown--open"
                      ])}
                    >
                    {item.submenu.map((subItem) => (
                      <Button 
                        className="header-menu-mobile__dropdown-button" 
                        key={subItem.to}
                        as={Link}
                        to={subItem.to}
                        variant="ghost"
                        theme="light"
                        onClick={onClose}
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
      </div>
    </div>
  );
};
