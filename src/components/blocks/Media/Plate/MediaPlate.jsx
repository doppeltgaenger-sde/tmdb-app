import { classNames } from "@utils";
import { PlateCard } from "@blocks";
import "./styles/MediaPlate.scss";

const VARIANTS = {
  "list": "media-plate--list",
  "grid": "media-plate--grid",
};

const COLUMNS = {
  "2": "media-plate--column-2",
};

const VARIANT_COLUMNS = {
  "grid": ["2"],
};

export const MediaPlate = ({ className, plates = [], variant = "list", columns }) => {
  if (!plates.length) return null;

  const isValidColumns = VARIANT_COLUMNS[variant]?.includes(columns);
  const columnsClass = isValidColumns ? COLUMNS[columns] : "";

  return (
    <div 
    className={classNames([
      "media-plate",
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
