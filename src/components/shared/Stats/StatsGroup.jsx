import { classNames } from "@utils";
import { StatsCard } from "@shared";
import "./styles/StatsGroup.scss";

export const StatsGroup = ({ className, title, stats = [] }) => {
  if (!stats.length) return null;

  return (
    <section
      className={classNames([
        "stats-group", 
        className,
      ])}
    >
      {title &&    
        <h3 className="stats-group__title">{title}</h3>
      }

      <div className="stats-group__list">
        {stats.map((stat) => (
          <StatsCard 
            key={stat.label}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </section>
  );
};
