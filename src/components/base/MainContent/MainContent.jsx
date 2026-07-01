import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  Route, 
  Routes, 
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { initAppConfiguration } from "@thunk";
import { Header, Footer } from "@layout";
import { 
  Home, 
  MediaDetails, 
  CollectionDetails,
  ProfileDetails,
  ProviderDetails,
  People,
  About,
  UserDetails,
  ErrorPage,
} from "@pages";

export const MainContent = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigationType = useNavigationType()

  useEffect(() => {
    dispatch(initAppConfiguration());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (navigationType === "PUSH" || navigationType === "REPLACE") {
      window.scrollTo(0, 0);
    } else if (navigationType === "POP") {
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedPosition) {
        window.scrollTo(0, Number(savedPosition));
      }
    }
  }, [pathname, navigationType]);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
