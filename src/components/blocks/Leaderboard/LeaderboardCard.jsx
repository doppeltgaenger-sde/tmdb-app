import { memo } from "react";
import { Link } from "react-router-dom";
import { Button, Avatar, MetricBar } from "@shared";
import { useInView } from "@hooks";
import "./styles/LeaderboardCard.scss";

export const LeaderboardCard = memo(({ 
  username, 
  color, 
  avatar, 
  stats, 
  maxAllTime, 
  maxWeek 
}) => {
  const { editsAllTime, editsThisWeek } = stats;
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="leaderboard-card">
      <Avatar
        className="leaderboard-card__avatar"
        src={avatar}
        name={username}
        color={color}
        size="md"
      />

      <div className="leaderboard-card__content">
        <h3 className="leaderboard-card__username">
          <Button 
            className="leaderboard-card__button" 
            as={Link} 
            to={`/`}
            variant="ghost"
            theme="dark"
            aria-label={`View ${username}'s profile`}
          >
            {username}
          </Button>
        </h3>

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
