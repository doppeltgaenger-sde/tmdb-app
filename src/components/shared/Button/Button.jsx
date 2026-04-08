import PropTypes from "prop-types";
import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/Button.scss";

const SIZES = {
  sm: "button--sm",
  md: "button--md",
  lg: "button--lg",
};

const VARIANTS = {
  primary: "button--primary",
  secondary: "button--secondary",
  tertiary: "button--tertiary",
  promo: "button--promo",
  overlay: "button--overlay",
};

const THEMES = {
  purple: "button--purple",
  gradient: "button--gradient",
};

export const Button = ({
  className = "",
  size = "md",
  type = "button",
  variant = "primary",
  theme = "",
  onClick = () => {},
  iconLeft,
  iconRight,
  disabled = false,
  children,
  ...restProps
}) => {
  const isPromo = variant === "promo";
  const themeClass = isPromo ? THEMES[theme] : "";

  return (
    <button
      type={type}
      className={classNames([
        "button",
        SIZES[size],
        VARIANTS[variant],
        themeClass,
        className,
      ])}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {iconLeft && (
        <Icon className="button__icon button__icon--left" name={iconLeft} />
      )}

      <span className="button__content">{children}</span>

      {iconRight && (
        <Icon className="button__icon button__icon--right" name={iconRight} />
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
};
