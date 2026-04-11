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
  as: Component = "button",
  className = "",
  size = "md",
  type = "button",
  variant = "primary",
  theme = "",
  onClick,
  iconLeft,
  iconRight,
  disabled = false,
  children,
  ...restProps
}) => {
  const isPromo = variant === "promo";
  const themeClass = isPromo ? THEMES[theme] : "";
  const isButton = Component === "button";

  return (
    <Component
      type={isButton ? type : undefined}
      className={classNames([
        "button",
        SIZES[size],
        VARIANTS[variant],
        themeClass,
        disabled && "button--disabled",
        className,
      ])}
      onClick={onClick}
      disabled={isButton ? disabled : undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
      {...restProps}
    >
      {iconLeft && (
        <Icon className="button__icon button__icon--left" name={iconLeft} />
      )}

      <span className="button__content">{children}</span>

      {iconRight && (
        <Icon className="button__icon button__icon--right" name={iconRight} />
      )}
    </Component>
  );
};

Button.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};
