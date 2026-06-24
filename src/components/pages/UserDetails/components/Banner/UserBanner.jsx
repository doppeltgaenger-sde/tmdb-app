import { useViewport } from "@hooks";
import { BackgroundPipes, Avatar, Average } from "@shared";
import "./styles/UserBanner.scss";

export const UserBanner = ({
  avatar,
  username,
  createdAt,
  scores,
  color,
}) => {
  const { isMobileLg } = useViewport();

  const { scoreMovie, scoreTV } = scores;

  return (
    <section className="user-banner">
      <BackgroundPipes color={color} />

      <div className="container">
        <div className="user-banner__body">
          <div className="user-banner__header-block">
            <Avatar
              className="user-banner__avatar"
              src={avatar}
              name={username}
              color={color}
              size={isMobileLg ? "lg" : "xl"}
            />

            <div className="user-banner__meta">
              <h1 className="user-banner__username">
                {username}
              </h1>

              <p className="user-banner__timestamp">
                Member since {createdAt}
              </p>
            </div>
          </div>

          <div className="user-banner__score-block">
            <div className="user-banner__average-block">
              <Average
                className="user-banner__average"
                value={scoreMovie}
                size={isMobileLg ? "md" : "lg"}
              />

              <p className="user-banner__average-label">
                <span className="block-text">Average</span>
                <span className="block-text">Movie Score</span>
              </p>
            </div>

            <div className="user-banner__average-block">
              <Average
                className="user-banner__average"
                value={scoreTV}
                size={isMobileLg ? "md" : "lg"}
              />

              <p className="user-banner__average-label">
                <span className="block-text">Average</span>
                <span className="block-text">TV Score</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
