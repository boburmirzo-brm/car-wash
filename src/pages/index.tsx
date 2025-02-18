import { Suspense } from "@/utils";
import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Login = lazy(() => import("./login/Login"));
const Auth = lazy(() => import("./auth/Auth"));
const NotFound = lazy(() => import("./not-found/NotFound"));

const AppRouter = () => {
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: (
            <Suspense>
              <Auth />
            </Suspense>
          ),
          children: [
            {
              path: "/",
              element: (
                <Suspense>
                  <Dashboard />
                </Suspense>
              ),
            },
           
          ],
        },
        {
          path: "/login",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense>
              <NotFound/>
            </Suspense>
          ),
        },
      ])}
    </>
  );
};

export default AppRouter;
