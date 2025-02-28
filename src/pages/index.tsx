import { Suspense } from "@/utils";
import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useCheckTokenQuery } from "../redux/api/auth";

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
  const token = localStorage.getItem("access_token");
  const { data, error } = useCheckTokenQuery(undefined, {
    skip: !token,
  });
  console.log(data);

  if (error) return <Navigate to="/login" replace />;
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: data?.success ? (
            <Suspense>
              <Auth />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
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
                      <CustomAuth role="ADMIN,OWNER" to="/EMPLOYEE" />
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
                      <CustomAuth role="EMPLOYEE" to="/" />
                    </Suspense>
                  ),
                  children: [
                    {
                      path: "EMPLOYEE",
                      element: (
                        <Suspense>
                          <Employer />
                        </Suspense>
                      ),
                    },
                    {
                      path: "EMPLOYEE/order",
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
          element: data?.success ? (
            <Navigate to="/EMPLOYEE" replace />
          ) : (
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
