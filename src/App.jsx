import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@store";
import { ViewportProvider } from "@hooks";
import { MainContent } from "@base";
import { GlobalLoader } from "@shared";
import "@styles/index.scss";

function App() {
  return (
    <Provider store={store}>
      <ViewportProvider>
        <BrowserRouter>
          <GlobalLoader />
          <MainContent />
        </BrowserRouter>
      </ViewportProvider>
    </Provider>
  );
}

export default App;
