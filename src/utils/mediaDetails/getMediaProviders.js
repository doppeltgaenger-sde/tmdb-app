export const getMediaProviders = (providers = [], mediaType) => {
  if (!providers) return [];

  return providers
    .filter((item) => !!item.logo_path)
    .map((item) => ({
      id: item.id,
      name: item.name || "",
      logoPath: item.logo_path,
      mediaType,
    }));
};
