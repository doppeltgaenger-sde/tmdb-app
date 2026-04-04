import { useState, useCallback } from "react";
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

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      dispatch(fetchMediaTrack("trendingTrack", tab));
    },
    [dispatch],
  );

  return (
    <section className="home-trending">
      <div className="container">
        <div className="home-trending__body">
          <MediaTrack
            title="Trending"
            items={data}
            tabs={[
              { value: "today", label: "Today" },
              { value: "week", label: "This week" },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
    </section>
  );
};
