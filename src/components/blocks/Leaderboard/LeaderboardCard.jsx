import { Avatar, MetricBar } from "@shared";
import "./styles/LeaderboardCard.scss";

export const LeaderboardCard = (props) => {
  const { 
    username, 
    color, 
    avatar, 
    stats, 
    maxAllTime, 
    maxWeek,
  } = props;

  return (
    <div className="leaderboard-card">
      <Avatar
        className="leaderboard-card__avatar"
        src={avatar}
        name={username}
        color={color}
      />

      <div className="leaderboard-card__content">
        <h3 className="leaderboard-card__username">{username}</h3>

        <MetricBar
          className="leaderboard-card__metric-bar"
          value={stats.editsAllTime}
          max={maxAllTime}
          variant="all"
        />

        <MetricBar
          className="leaderboard-card__metric-bar"
          value={stats.editsThisWeek}
          max={maxWeek}
          variant="week"
        />
      </div>
    </div>
  );
};
