import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveRoute } from "@/redux/features/active-route.slice";

export const useActiveRoute = (routes: string[]) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (routes.includes(location.pathname)) {
      dispatch(setActiveRoute(location.pathname));
    }
  }, [location.pathname, dispatch]);
};
