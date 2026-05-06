import { classNames } from "@utils";
import { PlateCard } from "@features";
import "./styles/DetailsPlate.scss";

const VARIANTS = {
  "list": "details-plate--list",
  "grid": "details-plate--grid",
};

const COLUMNS = {
  "2": "details-plate--column-2",
};

const VARIANT_COLUMNS = {
  "grid": ["2"],
};

export const DetailsPlate = ({ 
  className, 
  plates = [], 
  variant = "list", 
  columns,
}) => {
  if (!plates.length) return null;

  const isValidColumns = VARIANT_COLUMNS[variant]?.includes(columns);
  const columnsClass = isValidColumns ? COLUMNS[columns] : "";

  return (
    <div 
    className={classNames([
      "details-plate",
      VARIANTS[variant],
      columnsClass, 
      className,
    ])}
    >
      {plates.map((card) => {
        return (
          <PlateCard {...card} key={card.id} />
        );
      })}
    </div>
  );
};
