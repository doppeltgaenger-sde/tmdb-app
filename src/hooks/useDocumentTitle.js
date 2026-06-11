import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const baseTitle = "The Movie Database (TMDB)";
    document.title = title ? `${title} — ${baseTitle}` : baseTitle;
  }, [title]);
};
