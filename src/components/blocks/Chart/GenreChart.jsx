import { useViewport } from "@hooks";
import { 
  ResponsiveContainer, 
  PieChart,
  Tooltip, 
  Pie, 
  Cell,
} from "recharts";
import { ChartTooltip } from "@shared";
import "./styles/GenreChart.scss";

export const GenreChart = ({ data, color, title }) => {
  const { isTablet } = useViewport();

  return (
    <div className="genre-chart">
      {title &&
        <h3 className="genre-chart__title">{title}</h3>
      }

      <div className="genre-chart__body">
        <ResponsiveContainer
          className="genre-chart__container" 
          aspect={1}
        >
          <PieChart className="genre-chart__content">
            <Pie
              data={data}
              dataKey="percentage"
              outerRadius="100%"
              innerRadius="70%"
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={color} 
                  fillOpacity={1 - (index * 0.15)}
                />
              ))}
            </Pie>

            <Tooltip 
              className="genre-chart__tooltip"
              content={GenreTooltip} 
              cursor={{ fill: "#8c9598", fillOpacity: 0 }}
              isAnimationActive={false}
              trigger={isTablet ? "click" : "hover"}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="genre-chart__legend">
          {data.map((entry, index) => (
            <p key={entry.genre} className="genre-chart__legend-item">
              <span 
                className="genre-chart__legend-color" 
                style={{ backgroundColor: color, opacity: 1 - (index * 0.15) }} 
              />
              {entry.genre}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const GenreTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const {genre, percentage } = payload[0].payload;

    return (
      <ChartTooltip title={genre}>
        <p className="chart-tooltip__text-block">
          {percentage}%
        </p>
      </ChartTooltip>
    );
  }

  return null;
};
