import { useMemo } from "react";
import { useViewport } from "@hooks";
import { 
  AreaChart, 
  Area, 
  Tooltip, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChartTooltip } from "@shared";
import { createTrendData } from "./model/createTrendData";
import "./styles/PopularityChart.scss";

export const PopularityChart = ({ id, color }) => {
  const data = useMemo(() => createTrendData(id), [id]);
  const { isTablet, isMobileLg } = useViewport();

  const formatXAxis = (tickItem, index) => {
    if (index === data.length - 1) {
      return tickItem.split(" ")[0]; 
    }

    return index + 1;
  };

  return (
    <div className="popularity-chart">
      <h3 className="popularity-chart__title">Popularity Trend</h3>
      
      <ResponsiveContainer 
        className="popularity-chart__container" 
        aspect={isMobileLg ? 3.5 : 2.5}
      >
        <AreaChart
          className="popularity-chart__body"
          data={data}
          margin={{ top: 4, right: 10, left: -34, bottom: 4 }}
        >
          <CartesianGrid 
            stroke="#adb5bd" 
            strokeDasharray="3 3" 
            vertical={true}
            horizontal={true}
          />

          <XAxis 
            dataKey="day" 
            tickFormatter={formatXAxis}
            interval={0} 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#adb5bd" }}
            height={15}
          />

          <YAxis 
            domain={[0, 100]} 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#8c9598" }}
            ticks={[0, 25, 50, 75, 100]} 
          />

          <Tooltip 
            className="popularity-chart__tooltip"
            content={PopularityTooltip} 
            cursor={{ stroke: "#8c9598", strokeWidth: 1 }}
            isAnimationActive={false}
            trigger={isTablet ? "click" : "hover"}
          />

          <Area
            className="popularity-chart__area"
            type="linear"
            dataKey="popularity"
            stroke={color}
            strokeWidth={2}
            fill="transparent"
            dot={false}
            activeDot={{ r: 3, fill: color, strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const PopularityTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { day, ranked } = payload[0].payload;

    return (
      <ChartTooltip title={day}>
        <p className="chart-tooltip__text-block">
          Ranked {ranked}
        </p>
      </ChartTooltip>
    );
  }

  return null;
};
