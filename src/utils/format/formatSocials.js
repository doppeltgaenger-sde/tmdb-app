const SOCIALS_CONFIG = {
  facebook_id: { 
    name: "facebook", 
    baseUrl: "https://facebook.com/" 
  },
  twitter_id: { 
    name: "twitter", 
    baseUrl: "https://twitter.com/" 
  },
  instagram_id: { 
    name: "instagram", 
    baseUrl: "https://instagram.com/" 
  },
};

export const formatSocials = (externalIds, homepage) => {
  const socials = [];

  if (externalIds) {
    Object.entries(externalIds).forEach(([key, value]) => {
      const config = SOCIALS_CONFIG[key];

      if (value && config) {
        socials.push({
          name: config.name,
          url: `${config.baseUrl}${value}`,
        });
      }
    });
  }

  if (homepage) {
    socials.push({
      name: "homepage",
      url: homepage,
    });
  }

  return socials;
};
