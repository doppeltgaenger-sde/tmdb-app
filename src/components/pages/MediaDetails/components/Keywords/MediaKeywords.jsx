
import { KeywordsGroup } from "@shared";

export const MediaKeywords = ({ keywords }) => {
  return (
    <section className="media-keywords">
      <KeywordsGroup
        title="Keywords"
        keywords={keywords}
      />
    </section>
  );
};