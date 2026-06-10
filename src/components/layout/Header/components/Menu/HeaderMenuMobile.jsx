import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/HeaderMenuMobile.scss";
import { MENU_ITEMS } from "./data/menuItems";

export const HeaderMenuMobile = ({ isOpen, onClose }) => {
  const [activeSubmenu, isSetActiveSubmenu] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      isSetActiveSubmenu(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const inHandleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.addEventListener("keydown", inHandleEsc);

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.removeEventListener("keydown", inHandleEsc);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen, onClose]);

  const isToggleSubmenu = (label) => {
    isSetActiveSubmenu((prev) => (prev === label ? null : label));
  };

  const handleTriggerClick = (label) => {
    isToggleSubmenu(label);
  };

  const renderMenu = () => {
    return (
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
    );
  }

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

        {renderMenu()}
      </div>
    </div>
  );
};
