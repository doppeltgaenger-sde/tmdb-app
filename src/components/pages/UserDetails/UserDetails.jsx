import { useParams } from "react-router-dom";
import { processedUsers } from "@services";
import { 
  UserBanner,
  UserStats,
  UserMetrics,
  UserRatingChart, 
  UserGenreChart,
} from "./components";
import "./styles/UserDetails.scss";

export const UserDetails = () => {
  const { id } = useParams();
  const data = processedUsers.find((item) => item.id === id);

  if (!data) return (
    <div className="user-details">Error...</div>
  );

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
        </div>
      </div>
    </div>
  );
};
