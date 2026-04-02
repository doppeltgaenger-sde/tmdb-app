import PropTypes from "prop-types";
import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/Button.scss";

const VARIANTS = {
  primary: "button--primary",
  secondary: "button--secondary",
  tertiary: "button--tertiary",
};

export const Button = (props) => {
  const {
    children,
    type = "button",
    variant = "",
    className = "",
    onClick = () => {},
    iconLeft,
    iconRight,
    disabled = false,
    ...restProps
  } = props;

  return (
    <button
      type={type}
      className={classNames(["button", VARIANTS[variant], className])}
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
