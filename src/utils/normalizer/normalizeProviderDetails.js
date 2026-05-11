import { getMediaList, formatNumber } from "@utils";

export const normalizeProviderDetails = ({ details: item }) => {
  const id = item.id;

  return {
    id,
    name: item.name,
    country: item.origin_country,
    office: item.headquarters,
    logoPath: item.logo_path,
    homepage: item.homepage,
    mediaList: getMediaList(item.providerMedia) || [],
    totalResults: formatNumber(item.totalResults),
    mediaType: item.mediaType,
  };
};
