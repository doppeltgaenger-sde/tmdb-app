import { useState, useEffect, useContext, createContext } from "react";

const ViewportContext = createContext({});

const getViewport = () => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const ViewportProvider = ({ children }) => {
  const [viewport, setViewport] = useState(getViewport);

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setViewport(getViewport());
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  const { width, height } = useContext(ViewportContext);

  return {
    width,
    height,
    isMobileSm: width < 576,
    isMobileLg: width < 768,
    isTablet: width < 992,
    isDesktop: width >= 992,
  };
};
