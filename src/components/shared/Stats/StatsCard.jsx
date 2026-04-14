import "./styles/StatsCard.scss";

export const StatsCard = ({ label, value }) => {
  return (
    <div className="stats-card">
      <p className="stats-card__label">{label}</p>
      <p className="stats-card__value">{value}</p>
    </div>
  );
};