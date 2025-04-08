import { Suspense } from "@/utils";
import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

const EmployeeCarWash = lazy(() => import("./user/car-wash/EmployeeCarWash"));
const InactiveEmployees = lazy(
  () => import("./employees/inactive-employees/InactiveEmployees")
);
const ActiveEmployees = lazy(
  () => import("./employees/active-employees/ActiveEmployees")
);
const CustomerCar = lazy(() => import("./customer-car/CustomerCar"));
const Customers = lazy(() => import("./customer-car/customers/Customers"));
const Cars = lazy(() => import("./customer-car/cars/Cars"));
// Dashboard
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Admins = lazy(() => import("./admins/Admins"));
const Employees = lazy(() => import("./employees/Employees"));
const UserDetail = lazy(() => import("./user/detail/UserDetail"));
const Profile = lazy(() => import("./profile/Profile"));
const Bonus = lazy(() => import("./bonus/Bonus"));
const ExpenseHistory = lazy(() => import("./expense/ExpenseHistory"));
const ExpenseHistoryWrapper = lazy(
  () => import("./expense/ExpenseHistoryWrapper")
);
const CarWashingDone = lazy(
  () => import("./dashboard/car-washing-done/CarWashingDone")
);
const CarWahingProgress = lazy(
  () => import("./dashboard/car-washing-progress/CarWahingProgress")
);
// Employer
const Employer = lazy(() => import("./employer/Employer"));
const EmployeePaymentHistory = lazy(() => import("./employer/payment/PaymentHistory"));
const Order = lazy(() => import("./employer/order/Order"));
// All
const Auth = lazy(() => import("./auth/Auth"));
const Layout = lazy(() => import("./layout/Layout"));
const CustomAuth = lazy(() => import("./custom-auth/CustomAuth"));
const CarSearch = lazy(() => import("./employer/order/car-search/CarSearch"));
const Login = lazy(() => import("./login/Login"));
const CustomerSearch = lazy(
  () => import("./employer/order/customer-search/CustomerSearch")
);
const CustomerDetail = lazy(() => import("./customer/detail/CustomerDetail"));
const CustomersCar = lazy(() => import("./customer/detail/CustomersCar"));
const PaymentHistory = lazy(() => import("./customer/detail/PaymentHistory"));
const PaymentsHistory = lazy(() => import("./payment/PaymentHistory"));
const EmployeeProfile = lazy(() => import("./employer/profile/Profile"));
const CarDetail = lazy(() => import("./car/detail/CarDetail"));
const CarWashingHistory = lazy(
  () => import("../components/car-washing/CarWashingHistory")
);
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
                      children: [
                        {
                          path: "",
                          element: (
                            <Suspense>
                              <CarWahingProgress />
                            </Suspense>
                          ),
                        },
                        {
                          path: "car-washing-done",
                          element: (
                            <Suspense>
                              <CarWashingDone />
                            </Suspense>
                          ),
                        },
                      ],
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
                      children: [
                        {
                          path: "",
                          element: (
                            <Suspense>
                              <ActiveEmployees />
                            </Suspense>
                          ),
                        },
                        {
                          path: "inactive-employees",
                          element: (
                            <Suspense>
                              <InactiveEmployees />
                            </Suspense>
                          ),
                        },
                      ],
                    },
                    {
                      path: "/:dynamic/user/:id",
                      element: (
                        <Suspense>
                          <UserDetail />
                        </Suspense>
                      ),
                      children: [
                        {
                          path: "",
                          element: (
                            <Suspense>
                              <EmployeeCarWash />
                            </Suspense>
                          ),
                        },
                        {
                          path: "expense-history",
                          element: (
                            <Suspense>
                              <ExpenseHistoryWrapper />
                            </Suspense>
                          ),
                        },
                      ],
                    },
                    {
                      path: "/profile",
                      element: (
                        <Suspense>
                          <Profile />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/expense",
                      element: (
                        <Suspense>
                          <ExpenseHistory />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/payment",
                      element: (
                        <Suspense>
                          <PaymentsHistory />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/bonus",
                      element: (
                        <Suspense>
                          <Bonus />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/customer-car",
                      element: (
                        <Suspense>
                          <CustomerCar />
                        </Suspense>
                      ),
                      children: [
                        {
                          path: "",
                          element: (
                            <Suspense>
                              <Customers />
                            </Suspense>
                          ),
                        },
                        {
                          path: "cars",
                          element: (
                            <Suspense>
                              <Cars />
                            </Suspense>
                          ),
                        },
                      ],
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
                      ],
                    },
                    {
                      path: "employee/profile",
                      element: (
                        <Suspense>
                          <EmployeeProfile />
                        </Suspense>
                      ),
                      children: [
                        {
                          path: "",
                          element: (
                            <Suspense>
                              <CarWashingHistory />
                            </Suspense>
                          ),
                        },
                        {
                          path: "expense",
                          element: (
                            <Suspense>
                              <ExpenseHistoryWrapper />
                            </Suspense>
                          ),
                        },
                        {
                          path: "payment",
                          element: (
                            <Suspense>
                              <EmployeePaymentHistory />
                            </Suspense>
                          ),
                        },
                      ],
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
                          <CustomersCar />
                        </Suspense>
                      ),
                    },
                    {
                      path: "payment-history",
                      element: (
                        <Suspense>
                          <PaymentHistory />
                        </Suspense>
                      ),
                    },
                  ],
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
