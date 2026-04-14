import { StatsGroup } from "@shared";

export const MediaStats = ({
  status,
  originalLanguage,
  budget,
  revenue,
}) => {
  const stats = [
    {
      label: "Status",
      value: status,
    },
    {
      label: "Original Language",
      value: originalLanguage,
    },
    {
      label: "Budget",
      value: budget,
    },
    {
      label: "Revenue",
      value: revenue,
    },
  ];

  return (
    <StatsGroup
      className="media-stats"
      stats={stats}
    />
  );
};