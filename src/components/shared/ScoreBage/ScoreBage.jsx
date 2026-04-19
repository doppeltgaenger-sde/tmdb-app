import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/ScoreBage.scss"

export const ScoreBage = ({ className, score }) => {
  const normalizedValue = Number(score) || 0;

  const iconPercentageClass = normalizedValue
    ? `icon-r${normalizedValue}`
    : "icon-rNR";

  return (
    <div
      className={classNames([
        "score-bage",
        className,
      ])}
    >
      <Icon className="score-bage__icon" name="score-star" />

      <p
        className={classNames([
          "icon", 
          iconPercentageClass, 
          "score-bage__value"
        ])}
      />
    </div>
  );
};
