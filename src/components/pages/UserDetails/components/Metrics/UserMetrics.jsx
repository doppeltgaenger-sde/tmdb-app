import { formatNumber } from "@utils";
import "./styles/UserMetrics.scss";

export const UserMetrics = ({ stats, color }) => {
  const { editsAllTime, ratingsTotal } = stats;

  return (
    <div className="user-metrics">
      <div className="user-metrics__item">
        <h3 className="user-metrics__label">Total Edits</h3>
        <p 
          className="user-metrics__value"
          style={{ color }}
        >
          {renderNumber({value: editsAllTime})}
        </p>
      </div>

      <div className="user-metrics__item">
        <h3 className="user-metrics__label">Total Ratings</h3>
        <p 
          className="user-metrics__value"
          style={{ color }}
        >
          {renderNumber({value: ratingsTotal})}
        </p>
      </div>
    </div>
  );
};

const renderNumber = ({ value, compact = true, locale = "en-US" }) => {
  const formatted = formatNumber(value, { locale, compact });
  const parts = formatted.split(/([a-zA-Z]+)/);

  return (
    <span>
      {parts[0]}
      {parts[1] && 
        <span className="user-metrics__suffix">
          {parts[1]}
        </span>
      }
    </span>
  );
};
