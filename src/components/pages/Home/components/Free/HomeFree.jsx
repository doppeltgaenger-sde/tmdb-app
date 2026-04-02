import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaTrack } from "@thunk";
import { MediaTrack } from "@blocks";

export const HomeFree = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("movie");

  const trackState = useSelector(
    (state) => state.media.mediaTracks.freeTrack?.[activeTab],
  );

  const data = trackState?.data || [];

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchMediaTrack("freeTrack", activeTab));
    }
  }, [dispatch, activeTab, data.length]);

  const props = {
    title: "Free To Watch",
    items: data,
    tabs: [
      { value: "movie", label: "Movies" },
      { value: "tv", label: "TV" },
    ],
    activeTab: activeTab,
    onTabChange: setActiveTab,
  };

  return (
    <section className="home-free">
      <div className="container">
        <div className="home-free__body">
          <MediaTrack {...props} />
        </div>
      </div>
    </section>
  );
};
