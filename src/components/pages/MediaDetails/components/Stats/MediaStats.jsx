import { StatsGroup } from "@shared";

export const MediaStats = ({
  mediaType,
  status,
  company,
  network,
  type,
  originalLanguage,
  budget,
  revenue,
}) => {
  const stats = [
    {
      label: "Status",
      value: status,
    },

    ...(mediaType === "movie" ? [
      {
        label: "Company",
        value: company,
      },
    ] : []),
    
    ...(mediaType === "tv" ? [
      {
        label: "Network",
        value: network,
      },
      {
        label: "Type",
        value: type,
      },
    ] : []),

    {
      label: "Original Language",
      value: originalLanguage,
    },

    ...(mediaType === "movie" ? [
      {
        label: "Budget",
        value: budget,
      },
      {
        label: "Revenue",
        value: revenue,
      },
    ] : []),
  ].filter(Boolean);

  return (
    <StatsGroup
      className="media-stats"
      stats={stats}
    />
  );
};