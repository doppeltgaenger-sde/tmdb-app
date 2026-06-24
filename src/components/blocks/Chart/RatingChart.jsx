import { useViewport } from "@hooks";
import { getLeftMargin } from "@utils";
import { 
  BarChart, 
  Bar, 
  Tooltip, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChartTooltip, Icon } from "@shared";
import "./styles/RatingChart.scss";

export const RatingChart = ({ data, color, title }) => {
  const { isTablet } = useViewport();
  const leftMargin = getLeftMargin(data);

  const formatXAxis = (tickItem, index) => {
    if (index === data.length - 1) {
      return tickItem;
    }
    return tickItem;
  };

  return (
    <div className="rating-chart">
      {title &&
        <h3 className="rating-chart__title">{title}</h3>
      }
      
      <ResponsiveContainer 
        className="rating-chart__container" 
        aspect={2.5}
      >
        <BarChart
          className="rating-chart__content"
          data={data}
          margin={{ top: 4, right: 10, left: -leftMargin, bottom: 4 }}
          barCategoryGap="5%"
        >
          <CartesianGrid 
            stroke="#adb5bd" 
            strokeDasharray="3 3" 
            vertical={true}
            horizontal={true}
          />

          <XAxis 
            dataKey="rating" 
            tickFormatter={formatXAxis}
            interval={0} 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#adb5bd" }}
            height={15}
          />

          <YAxis 
            domain={[0, "auto"]} 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#8c9598" }}
          />

          <Tooltip 
            className="rating-chart__tooltip"
            content={RatingTooltip} 
            cursor={{ fill: "#8c9598", fillOpacity: 0 }}
            isAnimationActive={false}
            trigger={isTablet ? "click" : "hover"}
          />

          <Bar
            dataKey="count"
            fill={color}
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
            activeBar={{ fill: color, fillOpacity: 0.8, stroke: "none" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const RatingTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { rating, count } = payload[0].payload;

    const renderTitle = () => {
      return (
        <>    
          <Icon className="chart-tooltip__title-icon" name="score-star" />
          <span className="chart-tooltip__title-content">{rating}</span>
        </>
      );
    };

    return (
      <ChartTooltip title={renderTitle()}>
        <p className="chart-tooltip__text-block">
          Ratings {count}
        </p>
      </ChartTooltip>
    );
  }

  return null;
};
