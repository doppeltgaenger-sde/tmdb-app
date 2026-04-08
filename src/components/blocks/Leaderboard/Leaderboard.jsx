import { classNames } from "@utils";
import { users } from "@data";
import { createLeaderboard } from "./model/createLeaderboard";
import { LeaderboardCard } from "./LeaderboardCard";
import "./styles/Leaderboard.scss";

export const Leaderboard = ({ className }) => {
  const { users: rankedUsers, maxAllTime, maxWeek } = createLeaderboard(users);

  return (
    <section className={classNames(["leaderboard", className])}>
      <div className="container">
        <div className="leaderboard__body">
          <div className="leaderboard__title-block">
            <h2 className="leaderboard__title">Leaderboard</h2>

            <div className="leaderboard__meta">
              <p className="leaderboard__meta-item leaderboard__meta-item--all">
                All Time Edits
              </p>

              <p className="leaderboard__meta-item leaderboard__meta-item--week">
                Edits This Week
              </p>
            </div>
          </div>

          <div className="leaderboard__items">
            {rankedUsers.map((user) => (
              <LeaderboardCard
                key={user.id}
                {...user}
                maxAllTime={maxAllTime}
                maxWeek={maxWeek}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
