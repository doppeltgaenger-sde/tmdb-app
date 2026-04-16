
import { PopularityChart } from "@blocks";

export const MediaChart = ({ id, chartColor }) => {
  return (
    <PopularityChart
      className="media-chart"
      id={id}
      color={chartColor}
    />
  );
};