
import { PopularityChart } from "@blocks";

export const MediaChart = ({ id, chartColor }) => {
  return (
    <section className="media-chart">
      <PopularityChart
        id={id}
        color={chartColor}
        title="Popularity Trend"
      />
    </section>
  );
};
