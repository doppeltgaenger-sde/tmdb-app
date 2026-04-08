import { Route, Routes, Navigate } from "react-router-dom";
import { Home, MediaDetails } from "@pages";

export const MainContent = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<MediaDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
};
