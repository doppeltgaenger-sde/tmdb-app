import { classNames } from "@utils";
import "./styles/SpinLoader.scss";

const THEMES = {
  "light": "spin-loader--light",
  "primary": "spin-loader--primary",
};

export const SpinLoader = ({ 
  className = "", 
  theme = "",
}) => {
  return (
    <div 
      className={classNames([
        "spin-loader", 
        THEMES[theme],
        className
      ])}
    
    >
      <div className="spin-loader__circle" />
    </div>
  );
};
