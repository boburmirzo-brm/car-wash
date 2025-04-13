import { useEffect } from "react";
import OnlineStatus from "./components/online-status/OnlineStatus";
import AppRouter from "./pages";

const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <>
      <OnlineStatus />
      <AppRouter />
    </>
  );
};

export default App;
