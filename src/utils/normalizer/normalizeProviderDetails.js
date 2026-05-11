import { getMediaList, formatNumber } from "@utils";

export const normalizeProviderDetails = ({ details: item }) => {
  return {
    id: item.id,
    name: item.name,
    country: item.origin_country,
    office: item.headquarters,
    logoPath: item.logo_path,
    homepage: item.homepage,
    mediaType: item.mediaType,
    mediaList: getMediaList(item.providerMedia) || [],
    page: item.page,
    totalPages: item.totalPages,
    totalResultsCount: item.totalResults, 
    totalResultsFormatted: formatNumber(item.totalResults),
  };
};
