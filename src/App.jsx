import { useEffect } from "react";
import { Provider } from "react-redux";
import { ViewportProvider } from "@hooks";
import { store } from "@store";
import { GlobalLoader } from "@layout";
import { MainContent } from "@base";
import "@styles/index.scss";

function App() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scroll-position");

    if (savedPosition) {
      window.scrollTo(0, Number(savedPosition));
    }

    const handleScroll = () => {
      sessionStorage.setItem("scroll-position", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Provider store={store}>
      <ViewportProvider>
        <GlobalLoader />
        <MainContent />
      </ViewportProvider>
    </Provider>
  );
}

export default App;
