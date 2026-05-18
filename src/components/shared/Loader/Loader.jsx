import { classNames } from "@utils";
import "./styles/Loader.scss";

const THEMES = {
  "light": "loader--light",
  "primary": "loader--primary",
};

export const Loader = ({ 
  className = "", 
  theme = "",
}) => {
  return (
    <div 
      className={classNames([
        "loader", 
        THEMES[theme],
        className
      ])}
    
    >
      <div className="loader__spinner" />
    </div>
  );
};
