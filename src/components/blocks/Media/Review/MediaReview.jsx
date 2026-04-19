import { processedUsers } from "@services";
import { ReviewCard } from "@blocks";
import { featuredUser } from "./model/featuredUser";
import "./styles/MediaReview.scss";

export const MediaReview = ({ id }) => {
  const user = featuredUser(processedUsers, id);

  return (
    <section className="media-review">
      <h2 className="media-review__title">Reviews</h2>

      <div className="media-review__items">
        <ReviewCard {...user} />
      </div>
    </section>
  );
};