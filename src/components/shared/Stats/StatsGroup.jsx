import { classNames } from "@utils";
import { StatsCard } from "@shared";
import "./styles/StatsGroup.scss";

const VARIANTS = {
  "list": "stats-group--list",
  "grid": "stats-group--grid",
};

const COLUMNS = {
  "2": "stats-group--column-2",
  "3": "stats-group--column-3",
  "4": "stats-group--column-4",
};

const VARIANT_COLUMNS = {
  "grid": ["2", "3", "4"]
}

export const StatsGroup = ({ 
  className, 
  items = [],
  variant = "list", 
  columns,
  direction = "straight",
}) => {
  if (!items.length) return null;

  const isValidColumns = VARIANT_COLUMNS[variant]?.includes(columns);
  const columnsClass = isValidColumns ? COLUMNS[columns] : "";

  return (
    <div
      className={classNames([
        "stats-group", 
        VARIANTS[variant],
        columnsClass, 
        className,
      ])}
    >
      {items.map((stat) => (
        <StatsCard 
          key={stat.label}
          label={stat.label}
          value={stat.value}
          variant={direction}
        />
      ))}
    </div>
  );
};
