import { StatsGroup } from "@shared";

export const MediaStats = ({
  mediaType,
  status,
  networks,
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
    
    ...(mediaType === "tv" ? [
      {
        label: "Network",
        value: networks,
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