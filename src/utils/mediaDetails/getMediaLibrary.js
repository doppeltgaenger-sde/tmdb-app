export const getMediaLibrary = (images, videos, mediaId, mediaType = "movie") => {
  const backdrops = images?.backdrops || [];
  const posters = images?.posters || [];
  const videoResults = videos?.results || [];

  return {
    videos: videoResults
      .filter(v => v.site === "YouTube")
      .slice(0, 20)
      .map(video => ({
        id: video.key,
        mediaId,
        name: video.name,
        videoPreview: `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`,
        mediaType,
        variant: "video",
      })),

    backdrops: backdrops.slice(0, 20).map(image => ({
      id: image.file_path,
      backdropPath: image.file_path,
      variant: "backdrop",
    })),

    posters: posters.slice(0, 20).map(image => ({
      id: image.file_path,
      posterPath: image.file_path,
      variant: "poster",
    }))
  };
};
