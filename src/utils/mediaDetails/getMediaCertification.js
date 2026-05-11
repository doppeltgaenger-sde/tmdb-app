export const getMediaCertification = (releaseDates, country = "US", mediaType = "movie") => {
  if (!releaseDates?.length) return "";

  const region = releaseDates.find((r) => r.iso_3166_1 === country);

  if (!region) return "";

  return mediaType === "movie"
    ? region.release_dates?.find((r) => r.certification)?.certification || ""
    : region.rating || "";
};
