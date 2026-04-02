import { useCountUp, useInView } from "@hooks";
import { classNames, formatNumber } from "@utils";
import "./styles/MetricBar.scss";

export const MetricBar = (props) => {
  const { 
    className, 
    value = 0, 
    max = 1, 
    variant = "all",
  } = props;

  const { ref, isInView } = useInView();

  const animatedValue = useCountUp(isInView ? value : 0, 800);

  const rawPercent = max ? (value / max) * 100 : 0;

  const percent =
    rawPercent > 0 && rawPercent < 4 ? 10 : Math.min(rawPercent, 100);

  return (
    <div
      className={classNames([
        "metric-bar",
        `metric-bar--${variant}`,
        isInView && "metric-bar--visible",
        className,
      ])}
      ref={ref}
    >
      <div
        className="metric-bar__track"
        style={{
          width: `${percent}%`,
        }}
      >
        <div className="metric-bar__fill" />
      </div>

      <h4 className="metric-bar__value">{formatNumber(animatedValue)}</h4>
    </div>
  );
};
