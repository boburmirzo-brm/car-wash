import { Suspense } from "@/utils";
import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Login = lazy(() => import("./login/Login"));
const Auth = lazy(() => import("./auth/Auth"));
const CustomAuth = lazy(() => import("./custom-auth/CustomAuth"));
const Employer = lazy(() => import("./employer/Employer"));
const Layout = lazy(() => import("./layout/Layout"));
const Order = lazy(() => import("./employer/order/Order"));
const Profile = lazy(() => import("./profile/Profile"));
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
                  <Layout />
                </Suspense>
              ),
              children: [
                {
                  path: "/",
                  element: (
                    <Suspense>
                      <CustomAuth role="admin" to="/employer" />
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
                  path: "/",
                  element: (
                    <Suspense>
                      <CustomAuth role="employer" to="/" />
                    </Suspense>
                  ),
                  children: [
                    {
                      path: "employer",
                      element: (
                        <Suspense>
                          <Employer />
                        </Suspense>
                      ),
                    },
                    {
                      path: "employer/order",
                      element: (
                        <Suspense>
                          <Order />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: "profile",
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  ),
                },
              ],
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

export default React.memo(AppRouter);
