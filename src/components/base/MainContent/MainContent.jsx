import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { initAppConfiguration } from "@thunk";
import { Header } from "@layout";
import { 
  Home, 
  MediaDetails, 
  CollectionDetails,
  ProfileDetails,
  ProviderDetails,
  People,
  About,
  UserDetails,
} from "@pages";

export const MainContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAppConfiguration());
  }, [dispatch]);

  return (
    <>   
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:id" element={<CollectionDetails />} />
          <Route path="/people" element={<People />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/person/:id" element={<ProfileDetails />} />
          <Route path="/company/:id" element={<ProviderDetails mediaType="company" />} />
          <Route path="/network/:id" element={<ProviderDetails mediaType="network" />} />
          <Route path="/:mediaType/:id" element={<MediaDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
};
