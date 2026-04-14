
import { KeywordsGroup } from "@shared";

export const MediaKeywords = ({ keywords }) => {
  return (
    <KeywordsGroup
      className="media-keywords"
      title="Keywords"
      keywords={keywords}
    />
  );
};