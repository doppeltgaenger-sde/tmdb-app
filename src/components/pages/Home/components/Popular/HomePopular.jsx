import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaTrack } from "@thunk";
import { MediaTrack } from "@blocks";

export const HomePopular = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("streaming");

  const trackState = useSelector(
    (state) => state.media.mediaTracks.popularTrack?.[activeTab],
  );

  const data = trackState?.data || [];

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchMediaTrack("popularTrack", activeTab));
    }
  }, [dispatch, activeTab, data.length]);

  const props = {
    title: "What's Popular",
    items: data,
    tabs: [
      { value: "streaming", label: "Streaming" },
      { value: "tv", label: "On TV" },
      { value: "rent", label: "For Rent" },
      { value: "theaters", label: "In Theaters" },
    ],
    activeTab,
    onTabChange: setActiveTab,
  };

  return (
    <section className="home-popular">
      <div className="container">
        <div className="home-popular__body">
          <MediaTrack {...props} />
        </div>
      </div>
    </section>
  );
};
