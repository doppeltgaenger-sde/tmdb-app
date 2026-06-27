import { SelectionTrack, ActivityCard } from "@features";
import { createUserActivity  } from "./model/createUserActivity";
import "./styles/UserActivity.scss";

export const UserActivity = ({ activities }) => {
  const processedActivities = createUserActivity(activities);
  
  return (
    <section className="user-activity">
      <SelectionTrack
        className="user-activity__items"
        title="Recent Activity"
        items={processedActivities}
        CardComponent={ActivityCard}
      />
    </section>
  );
};
