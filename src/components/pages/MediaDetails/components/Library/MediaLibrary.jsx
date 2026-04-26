import { useState, useCallback, useMemo } from "react";
import { MediaTrack, FrameCard, TrailerModal } from "@blocks";
import "./styles/MediaLibrary.scss";

export const MediaLibrary = ({ library }) => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);

  const data = useMemo(() => library?.[activeTab] ?? [], [library, activeTab]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleCardActivate = useCallback((item) => {
    setActiveMedia({
      id: item.mediaId,
      videoKey: item.id,
      mediaType: item.mediaType,
      title: item.name,
    });

    if (item.variant === "video") {
      setIsModalOpen(true);
    }
  }, []);

  if (!library || (
    library.videos.length === 0 && 
    library.backdrops.length === 0 && 
    library.posters.length === 0
  )) {
    return null;
  }

  return (
    <section className="media-library">
      <MediaTrack
        title="Media"
        items={data}
        tabs={[
          { value: "videos", label: "Videos" },
          { value: "backdrops", label: "Backdrops" },
          { value: "posters", label: "Posters" },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCardActivate={handleCardActivate}
        CardComponent={FrameCard}
        variant="selection"
      />

      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mediaId={activeMedia?.id}
        videoKey={activeMedia?.videoKey}
        mediaType={activeMedia?.mediaType}
        title={activeMedia?.title}
      />
    </section>
  );
};
