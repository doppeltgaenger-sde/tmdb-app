import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaTrack } from "@thunk";
import { MediaTrack } from "@blocks";
import "./styles/HomePopular.scss";

export const HomePopular = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("streaming");

  const trackState = useSelector(
    (state) => state.media.mediaTracks.popularTrack?.[activeTab],
  );

  const data = trackState?.data || [];

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      dispatch(fetchMediaTrack("popularTrack", tab));
    },
    [dispatch],
  );

  return (
    <section className="home-popular">
      <div className="container">
        <div className="home-popular__body">
          <MediaTrack
            title="What's Popular"
            items={data}
            tabs={[
              { value: "streaming", label: "Streaming" },
              { value: "tv", label: "On TV" },
              { value: "rent", label: "For Rent" },
              { value: "theaters", label: "In Theaters" },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
    </section>
  );
};
