import { StatsGroup } from "@shared";
import "./styles/ProfileStats.scss";

export const ProfileStats = ({
  department,
  totalCredits,
  birthday,
  deathday,
  birthPlace,
  aliases,
}) => {
  const stats = [
    {
      label: "Known For",
      value: department,
    },
    {
      label: "Known Credits",
      value: totalCredits,
    },
    {
      label: "Birthday",
      value: birthday,
    },
    {
      label: "Day of Death",
      value: deathday,
    },
    {
      label: "Place of Birth",
      value: birthPlace,
    },
    {
      label: "Also Known As",
      value: aliases,
    },
  ];

  return (
    <section className="profile-stats">
      <h3 className="profile-stats__title">Personal Info</h3>

      <StatsGroup
        title="Personal Info"
        items={stats}
        variant="list"
        direction="straight"
      />
    </section>
  );
};
