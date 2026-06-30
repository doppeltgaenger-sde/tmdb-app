import { GenreChart } from "@blocks";
import "./styles/UserGenreChart.scss";

export const UserGenreChart = ({ data, color }) => {
  return (
    <section className="user-genre-chart">
      <GenreChart
        data={data}
        color={color}
        title="Most Watched Genres"
      />
    </section>
  );
};
