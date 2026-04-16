import { classNames } from "@utils";
import "./styles/ChartTooltip.scss"

export const ChartTooltip = ({ className, title, children }) => {
  return (
    <div className={classNames([ "chart-tooltip", className ])}>
      {title && 
        <h4 className="chart-tooltip__title">{title}</h4>
      }

      <div className="chart-tooltip__content">
        {children}
      </div>
    </div>
  );
};
