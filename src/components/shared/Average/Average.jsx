import {
  classNames,
  getCircleProgressColor,
  getCircleBackgroundColor,
} from "@utils";
import "./styles/Average.scss";

export const Average = ({ className, value, size = "sm", isSkeleton }) => {
  const normalizedValue = Number(value) || 0;
  const circleRadius = 17;
  const strokeWidth = 3;
  const viewBoxSize = 40;
  const centerPoint = viewBoxSize / 2;

  const percentage = Math.min(normalizedValue / 10, 1);
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference * (1 - percentage);

  const circleProps = {
    className: "average__circle",
    width: viewBoxSize,
    height: viewBoxSize,
    viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}`,
  };

  const circleBackgroundProps = {
    className: "average__circle-background",
    cx: centerPoint,
    cy: centerPoint,
    r: circleRadius,
    strokeWidth: strokeWidth,
    style: { stroke: getCircleBackgroundColor(normalizedValue) },
  };

  const circleProgressProps = {
    className: "average__circle-progress",
    cx: centerPoint,
    cy: centerPoint,
    r: circleRadius,
    strokeWidth: strokeWidth,
    strokeDasharray: circumference,
    strokeDashoffset: strokeOffset,
    strokeLinecap: "round",
    style: { stroke: getCircleProgressColor(normalizedValue) },
  };

  const iconPercentageClass = normalizedValue
    ? `icon-r${Math.round(normalizedValue * 10)}`
    : "icon-rNR";

  return (
    <div
      className={classNames([
        "average",
        `average--${size}`,
        isSkeleton && "average--skeleton",
        className,
      ])}
    >
      <svg {...circleProps}>
        <circle {...circleBackgroundProps} />
        <circle {...circleProgressProps} />
      </svg>

      <p
        className={classNames(["icon", iconPercentageClass, "average__value"])}
      />
    </div>
  );
};
