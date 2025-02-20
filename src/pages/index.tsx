import { Suspense } from "@/utils";
import { lazy} from "react";
import { useRoutes } from "react-router-dom";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Login = lazy(() => import("./login/Login"));
const Auth = lazy(() => import("./auth/Auth"));
const DashboardAuth = lazy(() => import("./dashboard-auth/DashboardAuth"));
const Employer = lazy(() => import("./employer/Employer"));
const Layout = lazy(() => import("./employer/Layout"));
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
                  <DashboardAuth />
                </Suspense>
              ),
              children: [
                {
                  path: "/",
                  element: (
                    <Suspense>
                      <Dashboard />
                    </Suspense>
                  )
                },
              ]
            },
            {
              path: "/",
              element: (
                <Suspense>
                  <Layout />
                </Suspense>
              ),
              children: [
                {
                  path: "employer",
                  element: (
                    <Suspense>
                      <Employer />
                    </Suspense>
                  )
                },
                {
                  path: "employer/order",
                  element: (
                    <Suspense>
                      <div>order</div>
                    </Suspense>
                  )
                },
                {
                  path: "employer/profile",
                  element: (
                    <Suspense>
                      <div>profile</div>
                    </Suspense>
                  )
                },
              ]
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
              <NotFound />
            </Suspense>
          ),
        },
      ])}
    </>
  );
};

export default AppRouter;
