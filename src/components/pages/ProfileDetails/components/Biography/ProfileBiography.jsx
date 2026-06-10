import { ExpandableText } from "@shared";
import "./styles/ProfileBiography.scss";

export const ProfileBiography = ({ biography }) => {
  return (
    <section className="profile-biography">
      <h2 className="profile-biography__title">Biography</h2>

      <ExpandableText className="profile-biography__content">
        {biography.map((paragraph, index) => (
          <p className="profile-biography__text" key={index}>
            {paragraph}
          </p>
        ))}
      </ExpandableText>
    </section>
  );
};
