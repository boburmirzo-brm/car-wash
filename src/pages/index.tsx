
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
const CarSearch = lazy(() => import("./employer/order/car-search/CarSearch"));
const CustomerSearch = lazy(() => import("./employer/order/customer-search/CustomerSearch"));
const CustomerDetail = lazy(() => import("./customer/detail/CustomerDetail"));
const CarDetail = lazy(() => import("./car/detail/CarDetail"));
const EmployeeProfile = lazy(() => import("./employer/profile/Profile"));
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
                      <CustomAuth role="ADMIN,OWNER" to="/employee" />
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
                      path: "employee",
                      element: (
                        <Suspense>
                          <Employer />
                        </Suspense>
                      ),
                    },
                    {
                      path: "employee/order",
                      element: (
                        <Suspense>
                          <Order />
                        </Suspense>
                      ),
                      children: [
                        {
                          path: "",
                          element: (
                            <Suspense>
                              <CarSearch />
                            </Suspense>
                          ),
                        },
                        {
                          path: "customer",
                          element: (
                            <Suspense>
                              <CustomerSearch />
                            </Suspense>
                          ),
                        },
                      ]
                    },
                    {
                      path: "employee/profile",
                      element: (
                        <Suspense>
                          <EmployeeProfile />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: "customer/:id",
                  element: (
                    <Suspense>
                      <CustomerDetail />
                    </Suspense>
                  ),
                },
                {
                  path: "car/:id",
                  element: (
                    <Suspense>
                      <CarDetail />
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