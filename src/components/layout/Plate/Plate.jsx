import { classNames } from "@utils";
import { WideCard } from "@features";
import "./styles/Plate.scss";

const VARIANTS = {
  "list": "plate--list",
  "grid": "plate--grid",
};

const COLUMNS = {
  "2": "plate--column-2",
  "3": "plate--column-3",
  "4": "plate--column-4",
};

const VARIANT_COLUMNS = {
  "grid": ["2", "3", "4"]
};

export const Plate = ({ 
  className, 
  plates = [], 
  variant = "list", 
  columns,
  CardComponent = WideCard,
}) => {
  if (!plates.length) return null;

  const isValidColumns = VARIANT_COLUMNS[variant]?.includes(columns);
  const columnsClass = isValidColumns ? COLUMNS[columns] : "";

  return (
    <div 
    className={classNames([
      "plate",
      VARIANTS[variant],
      columnsClass, 
      className,
    ])}
    >
      {plates.map((card) => {
        return (
          <CardComponent key={card.id} {...card} />
        );
      })}
    </div>
  );
};
