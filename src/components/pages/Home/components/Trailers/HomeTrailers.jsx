import { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaTrack } from "@thunk";
import { classNames } from "@utils";
import { MediaTrack, TrailerCard, TrailerModal } from "@blocks";
import "./styles/HomeTrailers.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w1280";

export const HomeTrailers = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("popular");
  const [activeBackdrop, setActiveBackdrop] = useState(null);
  const [visibleBackdrop, setVisibleBackdrop] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);

  const trackState = useSelector(
    (state) => state.media.mediaTracks.trailersTrack?.[activeTab],
  );

  const data = useMemo(() => trackState?.data ?? [], [trackState?.data]);

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      dispatch(fetchMediaTrack("trailersTrack", tab));
    },
    [dispatch],
  );

  useEffect(() => {
    if (data.length) {
      setActiveBackdrop(data[0].backdropPath);
    }
  }, [data]);

  useEffect(() => {
    if (!activeBackdrop) return;

    if (!visibleBackdrop) {
      setVisibleBackdrop(activeBackdrop);
      return;
    }

    if (activeBackdrop !== visibleBackdrop) {
      setIsFading(true);
    }
  }, [activeBackdrop, visibleBackdrop]);

  const handleTransitionEnd = () => {
    if (isFading) {
      setVisibleBackdrop(activeBackdrop);
      setIsFading(false);
    }
  };

  const handleCardHover = useCallback((trailer) => {
    if (trailer?.backdropPath) {
      setActiveBackdrop(trailer.backdropPath);
    }
  }, []);

  const handleCardActivate = useCallback((trailer) => {
    if (trailer?.backdropPath) {
      setActiveBackdrop(trailer.backdropPath);
    }

    setActiveMedia({
      id: trailer.id,
      mediaType: trailer.media_type,
      title: trailer.name,
    });

    setIsModalOpen(true);
  }, []);

  return (
    <section className="home-trailers">
      <div className="container">
        <div className="home-trailers__body">
          <MediaTrack
            title="Latest Trailers"
            items={data}
            tabs={[
              { value: "popular", label: "Popular" },
              { value: "streaming", label: "Streaming" },
              { value: "tv", label: "On TV" },
              { value: "rent", label: "For Rent" },
              { value: "theaters", label: "In Theaters" },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            CardComponent={TrailerCard}
            onCardHover={handleCardHover}
            onCardActivate={handleCardActivate}
            variant="trailers"
          />
        </div>
      </div>

      <div className="home-trailers__backdrops">
        <div
          className={classNames([
            "home-trailers__backdrop",
            "home-trailers__backdrop--base",
          ])}
          style={{
            backgroundImage: visibleBackdrop
              ? `url(${IMAGE_BASE}${visibleBackdrop})`
              : "none",
          }}
        />

        <div
          className={classNames([
            "home-trailers__backdrop",
            "home-trailers__backdrop--fade",
            isFading && "home-trailers__backdrop--visible",
          ])}
          style={{
            backgroundImage: activeBackdrop
              ? `url(${IMAGE_BASE}${activeBackdrop})`
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        />
      </div>

      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mediaId={activeMedia?.id}
        mediaType={activeMedia?.mediaType}
        title={activeMedia?.title}
      />
    </section>
  );
};
