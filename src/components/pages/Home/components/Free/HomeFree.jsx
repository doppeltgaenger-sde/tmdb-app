import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaTrack } from "@thunk";
import { MediaTrack } from "@blocks";
import "./styles/HomeFree.scss";

export const HomeFree = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("movie");

  const trackState = useSelector(
    (state) => state.media.mediaTracks.freeTrack?.[activeTab],
  );

  const data = trackState?.data || [];

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      dispatch(fetchMediaTrack("freeTrack", tab));
    },
    [dispatch],
  );

  return (
    <section className="home-free">
      <div className="container">
        <div className="home-free__body">
          <MediaTrack
            title="Free To Watch"
            items={data}
            tabs={[
              { value: "movie", label: "Movies" },
              { value: "tv", label: "TV" },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
    </section>
  );
};
