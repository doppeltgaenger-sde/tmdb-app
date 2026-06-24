import { GenreChart } from "@blocks";

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
