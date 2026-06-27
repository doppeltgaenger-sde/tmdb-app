import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { processedUsers } from "@services";
import { useDocumentTitle } from "@hooks";
import { 
  UserBanner,
  UserStats,
  UserMetrics,
  UserRatingChart, 
  UserGenreChart,
  UserActivity,
} from "./components";
import "./styles/UserDetails.scss";

export const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = processedUsers.find((item) => item.id === id);

  useEffect(() => {
    if (!data) {
      navigate("/404", { replace: true });
    }
  }, [data, navigate]);

  useDocumentTitle(data?.username);

  return (
    <div className="user-details">
      <UserBanner {...data} />
      <div className="container">
        <div className="user-details__body">
          <UserStats>
            <UserMetrics {...data} />

            <UserRatingChart 
              data={data?.ratingDistribution}
              color={data?.color}
            />

            <UserGenreChart
              data={data?.genreDistribution}
              color={data?.color}
            />
          </UserStats>

          <UserActivity activities={data?.activities} />
        </div>
      </div>
    </div>
  );
};
