import {
  HomeOutlined,
  AppstoreAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuChartColumn, LuUsers } from "react-icons/lu";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineDashboard,
  MdOutlineDiscount,
} from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { PiMoneyWavy } from "react-icons/pi";
import { TbCoins, TbUserShield } from "react-icons/tb";
import { theme } from "antd";

export const themeLight = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#314158",
    colorBgBase: "#ffffff",
    colorTextBase: "#1f2937",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    borderRadius: 4,
    colorBgContainer: "#fff",
  },
};
export const themeDark = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#314158", // --color-primary
    colorBgBase: "#000", // --color-bg
    colorBgContainer: "#1E2939", // --color-card / --color-sidebar
    // colorBgElevated: "#1E2939", // --color-card / --color-sidebar
    colorTextBase: "#FFFFFF", // --color-text
    colorText: "#c8d0df", // --color-text-muted (asosiy matndan tashqari)
    colorSuccess: "#22C55E", // --color-success
    colorWarning: "#EAB308", // --color-warning
    colorError: "#ff4d4f", // --color-danger
    colorBorder: "#2d3646", // --color-border
    // colorSplit: "#3F3F46", // --color-divider
    borderRadius: 4,
  },
};

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
    id: 9,
    path: "/statistic",
    title: "Statistika",
    icon: <LuChartColumn className="text-2xl" />,
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
    id: 4,
    path: "/expense",
    title: "Xarajat",
    icon: <PiMoneyWavy className="text-2xl" />,
  },
  {
    id: 5,
    path: "/payment",
    title: "Kirim",
    icon: <TbCoins className="text-2xl" />,
  },
  {
    id: 6,
    path: "/bonus",
    title: "Bonus",
    icon: <MdOutlineDiscount className="text-2xl" />,
  },
  {
    id: 7,
    path: "/customer-car",
    title: "Mijozlar",
    icon: <LuUsers className="text-2xl" />,
  },
  {
    id: 10,
    path: "/tariff",
    title: "Tariff",
    icon: <RiCoupon3Line className="text-2xl" />,
  },
  {
    id: 8,
    path: "/profile",
    title: "Profile",
    icon: <FaRegCircleUser className="text-2xl" />,
  },
];

export const ACTIVE_ROUTES_EMPLOYEE: string[] = [
  "/employee",
  "/employee/order",
  "/employee/profile",
];

// MOTIVATION_SENTENCES_AFTER_WASHING
export const MSAW = [
  "Yana bir mashina porlab turibdi! Qoyil, ustoz!",
  "Mashina porlayapti, mijoz xursand, sen esa — yulduzsan!",
  "Yana bir yutuq! Har bir tomchi — sening mahoratingdan dalolat!",
  "Qani endi barchasi shunaqa silliq ketaversin!",
  "Tozalikka muhabbat — senga yarashadi! Zo’r ish!",
  "Mashina emas, oynadek! Raqiblaring havas qiladi!",
  "Bugun ham bir mo‘jiza sodir bo‘ldi — sening qo‘ling bilan!",
  "Yuvilgan mashina — baxtli mashina. Yuvgan odam — haqiqiy professional!",
];
// MOTIVATION_SENTENCES_BEFORE_WASHING
export const MSBW = [
  "Yana bir mashina seni kutyapti — unga porlashni o‘rgat!",
  "Keling, bu mashinani yana avvalgi shon-shuhratiga qaytaramiz!",
  "Toza mashina — baxtli mijoz. Boshladikmi?",
  "Qo‘llaring mo‘jiza yaratishga tayyor! Vaqt keldi!",
  "Bugun ham tarixga kiradigan tozalikka guvoh bo‘lamiz!",
  "Mashina yuvish emas bu — san’at!",
];
