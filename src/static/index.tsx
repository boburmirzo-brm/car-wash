import {
  HomeOutlined,
  AppstoreAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineDashboard,
  MdOutlineDiscount,
} from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { TbCoins, TbUserShield } from "react-icons/tb";

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
    icon: <MdOutlineDashboard className="text-2xl" />,
  },
  {
    id: 2,
    path: "/admins",
    title: "Adminlar",
    icon: <MdOutlineAdminPanelSettings className="text-2xl" />,
  },
  {
    id: 3,
    path: "/employees",
    title: "Ishchilar",
    icon: <TbUserShield className="text-2xl" />,
  },
  {
    id: 5,
    path: "/expense",
    title: "Xarajat",
    icon: <PiMoneyWavy className="text-2xl" />,
  },
  {
    id: 6,
    path: "/payment",
    title: "Kirim",
    icon: <TbCoins className="text-2xl" />,
  },
  {
    id: 7,
    path: "/bonus",
    title: "Bonus",
    icon: <MdOutlineDiscount className="text-2xl" />,
  },
  {
    id: 8,
    path: "/customer-car",
    title: "Mijozlar",
    icon: <LuUsers className="text-2xl" />,
  },
  {
    id: 4,
    path: "/profile",
    title: "Profile",
    icon: <FaRegCircleUser  className="text-2xl" />,
  },
];

export const ACTIVE_ROUTES_EMPLOYEE: string[] = [
  "/employee",
  "/employee/order",
  "/employee/profile",
];
