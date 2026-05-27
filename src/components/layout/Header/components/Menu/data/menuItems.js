import { Link } from "react-router-dom";

export const MENU_ITEMS = [
  { 
    as: Link, 
    to: "/about", 
    label: "About", 
    aria: "About TMDB official site" 
  },
  {
    as: "button",
    label: "Movies",
    submenu: [
      { to: "/movie", label: "Popular", aria: "Popular Movies" },
      { to: "/movie/now-playing", label: "Now Playing", aria: "now playing movies from TMDB" },
      { to: "/movie/upcoming", label: "Upcoming", aria: "upcoming movies from TMDB" },
      { to: "/movie/top-rated", label: "Top Rated", aria: "top rated movies from TMDB" },
    ],
  },
  {
    as: "button",
    label: "TV Shows",
    submenu: [
      { to: "/tv", label: "Popular", aria: "popular TV shows from TMDB" },
      { to: "/tv/airing-today", label: "Airing Today", aria: "today airing TV shows from TMDB" },
      { to: "/tv/on-the-air", label: "On TV", aria: "currently airing TV shows from TMDB" },
      { to: "/tv/top-rated", label: "Top Rated", aria: "top rated TV shows from TMDB" },
    ],
  },
  { 
    as: Link, 
    to: "/people", 
    label: "People", 
    aria: "Explore TMDB popular people" 
  },
];
