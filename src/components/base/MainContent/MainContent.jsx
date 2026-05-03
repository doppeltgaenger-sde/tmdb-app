import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { initAppConfiguration } from "@thunk";
import { 
  Home, 
  MediaDetails, 
  CollectionDetails, 
} from "@pages";

export const MainContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAppConfiguration());
  }, [dispatch]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<MediaDetails />} />
        <Route path="/collection/:id" element={<CollectionDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};
