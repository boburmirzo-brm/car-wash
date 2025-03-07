import {
  HomeOutlined,
  AppstoreAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const EMPLOYEE_NAVIGATION = [
  {
    id: 1,
    path: "/employee",
    icon: <HomeOutlined />,
  },
  {
    id: 2,
    path: "/employee/order",
    icon: <AppstoreAddOutlined />,
  },
  {
    id: 3,
    path: "/employee/profile",
    icon: <UserOutlined />,
  },
];

export const ACTIVE_ROUTES_EMPLOYEE: string[] = ["/employee", "/employee/order", "/employee/profile"]