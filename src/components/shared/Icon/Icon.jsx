import PropTypes from "prop-types";
import { classNames } from "@utils";
import ICONS from "./icons";

export const Icon = ({ 
  className = "", 
  name, 
  ...restProps 
}) => {
  if (!ICONS[name]) {
    return null;
  }

  const icon =
    ICONS[name].format === "data" ? (
      <path d={ICONS[name].path} />
    ) : (
      ICONS[name].markup
    );

  return (
    <svg
      className={classNames(["icon", className])}
      viewBox={ICONS[name].viewbox}
      fill={ICONS[name].initColor || ""}
      {...restProps}
    >
      {icon}
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};
