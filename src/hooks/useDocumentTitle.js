import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const baseTitle = "The Movie Database (TMDB)";
    const isHome = window.location.pathname === "/";

    document.title = isHome ? baseTitle : (title ? `${title} — ${baseTitle}` : baseTitle);
  }, [title]);
};
