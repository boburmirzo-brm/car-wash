import {
  HomeOutlined,
  AppstoreAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineDashboard,
} from "react-icons/md";

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

export const SIDEBAR_LINKS = [
  {
    id: 1,
    path: "/",
    title: "Dashboard",
    icon: <MdOutlineDashboard className="text-2xl"/>,
  },
  {
    id: 2,
    path: "/admins",
    title: "Adminlar",
    icon: <MdOutlineAdminPanelSettings className="text-2xl"/>,
  },
  {
    id: 3,
    path: "/employees",
    title: "Ishchilar",
    icon: <FaRegUserCircle className="text-2xl"/>,
  },
  {
    id: 4,
    path: "/profile",
    title: "Profile",
    icon: <FaRegUser className="text-2xl"/>,
  },
];

export const ACTIVE_ROUTES_EMPLOYEE: string[] = [
  "/employee",
  "/employee/order",
  "/employee/profile",
];
