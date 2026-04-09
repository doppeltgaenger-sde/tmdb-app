import { memo, useMemo } from "react";
import { useCountUp } from "@hooks";
import { classNames, formatNumber } from "@utils";
import "./styles/MetricBar.scss";

export const MetricBar = memo(({ 
  className, 
  value = 0, 
  max = 1, 
  variant = "all", 
  isInView = false 
}) => {
  const animatedValue = useCountUp(isInView ? value : 0, 800);

  const percent = useMemo(() => {
    const raw = max ? (value / max) * 100 : 0;

    return raw > 0 && raw < 4 ? 10 : Math.min(raw, 100);
  }, [value, max]);

  const trackStyle = useMemo(
    () => ({
      width: `${percent}%`,
    }),
    [percent],
  );

  const formattedValue = useMemo(() => {
    return formatNumber(animatedValue);
  }, [animatedValue]);

  return (
    <div
      className={classNames([
        "metric-bar",
        `metric-bar--${variant}`,
        isInView && "metric-bar--visible",
        className,
      ])}
    >
      <div className="metric-bar__track" style={trackStyle}>
        <div className="metric-bar__fill" />
      </div>

      <h4 className="metric-bar__value">{formattedValue}</h4>
    </div>
  );
});
