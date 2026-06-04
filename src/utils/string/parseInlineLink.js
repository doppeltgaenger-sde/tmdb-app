import { Link } from "react-router-dom";
import { Button } from "@shared";

export const parseInlineLink = (text, to = "/", className = "") => {
  const linkRegex = /\[link:(.*?)\]/;
  const match = text.match(linkRegex);

  if (!match) return text;

  const linkText = match[1];
  const parts = text.split(linkRegex);

  return parts.map((part, index) => {
    if (part === linkText) {
      return (
        <Button 
          className={className} 
          key={index}
          as={Link} 
          to={to}
          target="_blank"
          variant="ghost"
          aria-label="TMDB 2025 Year in Review"
        >
          {linkText}
        </Button>
      );
    }
    return part;
  });
};
