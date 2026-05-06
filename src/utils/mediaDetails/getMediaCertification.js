export const getMediaCertification = (releaseDates, country = "US") => {
  if (!releaseDates?.length) return "";

  const region = releaseDates.find((r) => r.iso_3166_1 === country);

  if (!region) return "";

  const certification = region.release_dates?.find((r) => r.certification);

  return certification?.certification || "";
};
