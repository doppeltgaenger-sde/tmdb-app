import { SocialsGroup } from "@shared";
import "./styles/ProfileSocials.scss"

export const ProfileSocials = ({ socials }) => {
  return (
    <section className="profile-socials">
      <SocialsGroup items={socials} />
    </section>
  );
};
