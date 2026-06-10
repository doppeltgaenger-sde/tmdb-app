import { StatsGroup } from "@shared";

export const MediaStats = ({
  mediaType,
  status,
  companies,
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

    ...(mediaType === "movie" ? [
      {
        label: "Company",
        value: companies,
      },
    ] : []),
    
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
    <section className="media-stats">
      <StatsGroup
        stats={stats}
        variant="list"
        direction="straight"
      />
    </section>
  );
};
