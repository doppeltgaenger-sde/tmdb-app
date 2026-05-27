import { useState, useEffect } from "react";
import { useViewport } from "@hooks";
import { 
  HeaderLogo, 
  HeaderMenuDesktop,
  HeaderMenuMobile,
  HeaderLoginButton, 
  HeaderSearchButton,
  HeaderMenuButton,
} from "./components";
import "./styles/Header.scss";

export const Header = () => {
  const { isMobileLg } = useViewport();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMobileLg) {
      setIsMenuOpen(false);
    }
  }, [isMobileLg]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <div className="header__left">
            <HeaderLogo />

            {!isMobileLg 
              && <HeaderMenuDesktop />
            }
          </div>

          <div className="header__right">
            <HeaderLoginButton />
            <HeaderSearchButton />

            {isMobileLg && (
              <HeaderMenuButton 
                isOpen={isMenuOpen} 
                onClick={handleToggleMenu} 
              />
            )}
          </div>
        </div>
      </div>

      {isMobileLg && (
        <HeaderMenuMobile 
          isOpen={isMenuOpen} 
          onClose={handleCloseMenu} 
        />
      )}
    </header>
  );
};
