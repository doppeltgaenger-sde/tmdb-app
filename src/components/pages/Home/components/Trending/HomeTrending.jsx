import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaTrack } from "@thunk";
import { MediaTrack } from "@blocks";
import "./styles/HomeTrending.scss";

export const HomeTrending = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("today");

  const trackState = useSelector(
    (state) => state.media.mediaTracks.trendingTrack?.[activeTab],
  );

  const data = trackState?.data || [];

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchMediaTrack("trendingTrack", activeTab));
    }
  }, [dispatch, activeTab, data.length]);

  const props = {
    title: "Trending",
    items: data,
    tabs: [
      { value: "today", label: "Today" },
      { value: "week", label: "This week" },
    ],
    activeTab: activeTab,
    onTabChange: setActiveTab,
  };

  return (
    <section className="home-trending">
      <div className="container">
        <div className="home-trending__body">
          <MediaTrack {...props} />
        </div>
      </div>
    </section>
  );
};
