import { SocialsGroup } from "@shared";

export const MediaSocials = ({ socials }) => {
  return (
    <section className="media-socials">
      <SocialsGroup items={socials} />
    </section>
  );
};
