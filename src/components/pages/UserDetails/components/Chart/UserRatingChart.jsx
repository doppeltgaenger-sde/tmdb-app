import { RatingChart } from "@blocks";
import "./styles/UserRatingChart.scss";

export const UserRatingChart = ({ data, color }) => {
  return (
    <section className="user-rating-chart">
      <RatingChart
        data={data}
        color={color}
        title="Rating Overview"
      />
    </section>
  );
};
