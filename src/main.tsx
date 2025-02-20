import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/index.ts";
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: "#1E90FF",
    // colorSuccess: "#52c41a",
    // colorWarning: "#faad14",
    // colorError: "#ff4d4f",
    borderRadius: 4,
    colorBgContainer: "#fff",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ConfigProvider>
);
