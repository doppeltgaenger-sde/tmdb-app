import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles/GlobalLoader.scss";

export const GlobalLoader = () => {
  const loadingCount = useSelector((state) => state.app.loadingCount);
  const isInitialized = useSelector((state) => state.app.isInitialized);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (!isInitialized && loadingCount > 0) {
      setVisible(true);
      setProgress(5);

      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) return prev;
          return prev + Math.random() * 8;
        });
      }, 800);
    } else {
      setProgress(100);

      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 900);
    }

    return () => clearInterval(timer);
  }, [loadingCount, isInitialized]);

  if (!visible) return null;

  return <div className="global-loader" style={{ width: `${progress}%` }} />;
};
