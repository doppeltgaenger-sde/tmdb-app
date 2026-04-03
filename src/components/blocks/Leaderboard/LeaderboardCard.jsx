import { memo } from "react";
import { Avatar, MetricBar } from "@shared";
import { useInView } from "@hooks";
import "./styles/LeaderboardCard.scss";

export const LeaderboardCard = memo((props) => {
  const { 
    username, 
    color, 
    avatar, 
    stats, 
    maxAllTime, 
    maxWeek,
  } = props;

  const { editsAllTime, editsThisWeek } = stats;

  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="leaderboard-card">
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
          value={editsAllTime}
          max={maxAllTime}
          variant="all"
          isInView={isInView}
        />

        <MetricBar
          className="leaderboard-card__metric-bar"
          value={editsThisWeek}
          max={maxWeek}
          variant="week"
          isInView={isInView}
        />
      </div>
    </div>
  );
});
