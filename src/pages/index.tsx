
import { Suspense } from "@/utils";
import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
// Dashboard
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Admins = lazy(() => import("./admins/Admins"));
const Employees = lazy(() => import("./employees/Employees"));
const UserDetail = lazy(() => import("./user/detail/UserDetail"));
const Profile = lazy(() => import("./profile/Profile"));
// Employer
const Employer = lazy(() => import("./employer/Employer"));
const Order = lazy(() => import("./employer/order/Order"));
// All
const Auth = lazy(() => import("./auth/Auth"));
const Layout = lazy(() => import("./layout/Layout"));
const CustomAuth = lazy(() => import("./custom-auth/CustomAuth"));
const CarSearch = lazy(() => import("./employer/order/car-search/CarSearch"));
const Login = lazy(() => import("./login/Login"));
const CustomerSearch = lazy(() => import("./employer/order/customer-search/CustomerSearch"));
const CustomerDetail = lazy(() => import("./customer/detail/CustomerDetail"));
const CustomersCar = lazy(() => import("./customer/detail/CustomersCar"));
const PaymentHistory = lazy(() => import("./customer/detail/PaymentHistory"));
const EmployeeProfile = lazy(() => import("./employer/profile/Profile"));
const CarDetail = lazy(() => import("./car/detail/CarDetail"));
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
                    {
                      path: "/admins",
                      element: (
                        <Suspense>
                          <Admins />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/employees",
                      element: (
                        <Suspense>
                          <Employees />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/:dynamic/user/:id",
                      element: (
                        <Suspense>
                          <UserDetail />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/profile",
                      element: (
                        <Suspense>
                          <Profile/>
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
                  children: [
                    {
                      path: "",
                      element: (
                        <Suspense>
                          <CustomersCar/>
                        </Suspense>
                      ),
                    },
                    {
                      path: "payment-history",
                      element: (
                        <Suspense>
                          <PaymentHistory/>
                        </Suspense>
                      ),
                    },
                    
                  ]
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