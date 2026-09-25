import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { initAnalytics } from "./services/analytics";
import { SmoothScrollProvider } from "./components/scroll/SmoothScrollProvider";
import { AppRoutes } from "./routes";

export default function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <AppRoutes />
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}
