const CARD_WIDTHS = {
  ActivityCard: 250,
  BackdropCard: 250,
  PosterCard: 150,
  ProfileCard: 140,
  TrailerCard: 300,
  FrameCard: {
    videos: { desktop: 530, tablet: 425, mobile: 320 },
    backdrops: { desktop: 530, tablet: 425, mobile: 320 },
    posters: { desktop: 200, tablet: 160, mobile: 120 },
  }
};

const getCardWidth = (componentName, dataType, containerWidth) => {
  const isDesktop = containerWidth >= 992;
  const isTablet = containerWidth >= 576;

  if (componentName === "FrameCard") {
    const config = dataType === "poster" 
      ? { desktop: 200, tablet: 160, mobile: 120 }
      : { desktop: 530, tablet: 425, mobile: 320 };
      
    return isDesktop ? config.desktop : (isTablet ? config.tablet : config.mobile);
  }

  return CARD_WIDTHS[componentName];
};

export const getCardCount = (componentName, dataType, containerWidth) => {
  const cardWidth = getCardWidth(componentName, dataType, containerWidth);
  return Math.ceil(containerWidth / (cardWidth + 20)) + 1;
};
