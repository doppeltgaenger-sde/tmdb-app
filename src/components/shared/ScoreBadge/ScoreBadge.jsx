import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/ScoreBadge.scss"

export const ScoreBadge = ({ className, value }) => {
  const normalizedValue = Number(value) || 0;

  const iconPercentageClass = normalizedValue
    ? `icon-r${normalizedValue}`
    : "icon-rNR";

  return (
    <div
      className={classNames([
        "score-badge",
        className,
      ])}
    >
      <Icon className="score-badge__icon" name="score-star" />

      <p
        className={classNames([
          "icon", 
          iconPercentageClass, 
          "score-badge__value"
        ])}
      />
    </div>
  );
};
