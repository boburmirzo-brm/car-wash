import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./redux/index.ts";
import { ConfigProvider } from "antd";
import { Suspense } from "./utils/index.tsx";
import "@/static/methods.ts";
import { themeDark, themeLight } from "./static/index.tsx";
import { ReactNode } from "react";

const ThemeMode = ({ children }: { children: ReactNode }) => {
  const theme = useSelector((state: RootState) => state.themeMode.value);
  return (
    <ConfigProvider theme={theme === "dark" ? themeDark : themeLight}>
      {children}
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeMode>
        <Suspense>
          <App />
        </Suspense>
      </ThemeMode>
    </Provider>
  </BrowserRouter>
);
