import { useState, useCallback, useMemo } from "react";
import { MultipleTrack, FrameCard, TrailerModal } from "@features";
import "./styles/MediaLibrary.scss";

export const MediaLibrary = ({ library }) => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);

  const availableTabs = useMemo(() => {
    const allTabs = [
      { value: "videos", label: "Videos" },
      { value: "backdrops", label: "Backdrops" },
      { value: "posters", label: "Posters" },
    ];
    
    return allTabs.filter((tab) => library?.[tab.value]?.length > 0);
  }, [library]);

  const activeTabValidated = useMemo(() => {
    return availableTabs.some(t => t.value === activeTab) 
      ? activeTab 
      : (availableTabs[0]?.value || "videos");
  }, [activeTab, availableTabs]);

  const data = useMemo(() => library?.[activeTabValidated] ?? [], [library, activeTabValidated]);

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

  if (availableTabs.length === 0) return null;

  return (
    <section className="media-library">
      <MultipleTrack
        title="Media"
        items={data}
        tabs={availableTabs.length > 1 ? availableTabs : null}
        activeTab={activeTabValidated}
        onTabChange={handleTabChange}
        onCardActivate={handleCardActivate}
        CardComponent={FrameCard}
        cardName="FrameCard"
        variant="selection"
        dataType={activeTab}
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
