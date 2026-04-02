export const parseInlineMarkup = (text) => {
  const parts = text.split(/\[highlight\]|\[\/highlight\]/g);

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="highlight-text">{part}</span>
    ) : (
      part
    )
  );
};
