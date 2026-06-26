import { SelectionTrack, ActivityCard } from "@features";
import "./styles/UserActivity.scss";

export const UserActivity = ({ activities }) => {
  return (
    <section className="user-activity">
      <SelectionTrack
        className="user-activity__items"
        title="Recent Activity"
        items={activities}
        CardComponent={ActivityCard}
      />
    </section>
  );
};
