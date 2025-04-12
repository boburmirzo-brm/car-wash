import React, { useCallback, useState } from "react";
import { Typography, Tag, Button, Popconfirm, Skeleton, Alert } from "antd";
// import { UserOutlined } from "@ant-design/icons";
import { useCheckTokenQuery } from "@/redux/api/auth";
import UserPopup from "@/components/user-popup/UserPopup";
import { FaRegEdit } from "react-icons/fa";
import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth.slice";
import { TbUserShield } from "react-icons/tb";
import { useGetSalaryByIdQuery } from "@/redux/api/salary";
import { SalaryType } from "@/constant";
import Box from "@/components/ui/Box";
import { NavLink, Outlet } from "react-router-dom";

const { Title } = Typography;

const Profile = () => {
  const { data, isLoading } = useCheckTokenQuery();
  const { data: salary, isError } = useGetSalaryByIdQuery(data?.user?.id, {
    skip: !data?.user?.id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsEditing(false);

    if (!isBack) {
      window.history.back();
    }
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const user = data?.user || {};
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col gap-4 py-4 ">
      {isError && (
        <Alert
          message={"Oylik belgilanmagan. Avval oylikni belgilating"}
          style={{ width: "100%" }}
          type="error"
        />
      )}
      <Box>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
            <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-3">
              <div>
                <TbUserShield className="text-8xl text-gray-600" />
              </div>
              <div className="w-full ">
                <h3 className="text-2xl font-medium">{user.f_name}</h3>
                <h4 className="text-base">{user.l_name}</h4>
                <p className="text-gray-700 mt-2">@{user.username}</p>
                {/* <div className="mt-2">
                  <Tag
                    color={user.is_active ? "green" : "red"}
                    className="text-xs md:text-sm"
                  >
                    {user.is_active ? "Faol" : "Faol emas"}
                  </Tag>
                </div> */}
              </div>
            </div>

            <div className="flex w-full flex-col items-end gap-1.5">
              <Title
                level={3}
                type={
                  user.budget === 0
                    ? "secondary"
                    : user.budget > 0
                    ? "success"
                    : "danger"
                }
                style={{ marginBottom: 0 }}
              >
                {user.budget?.toLocaleString() || "0"} UZS
              </Title>
              {!isError && (
                <Tag
                  onClick={() => setIsShow(!isShow)}
                  color="green"
                  className="cursor-pointer"
                >
                  {isShow
                    ? `${salary?.data?.payload?.amount?.toLocaleString()}
                    ${
                      salary?.data?.payload?.type === SalaryType.PERCENT
                        ? "%"
                        : "so'm"
                    }`
                    : "****"}
                </Tag>
              )}
              <TelPopUp phoneNumber={user.tel_primary} />
              <div className="flex gap-1.5">
                <Button onClick={() => setIsEditing(true)} type="default">
                  <FaRegEdit className="text-lg" />
                </Button>
                <Popconfirm
                  title="Tizimdan chiqish"
                  description="Chindan ham tizimdan chiqmoqchimisiz"
                  onConfirm={handleLogout}
                  okText="Ha"
                  cancelText="Yo'q"
                >
                  <Button type="default">
                    <MdLogout className="text-lg" />
                    <span>Log out</span>
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        )}
      </Box>

      <div className="flex gap-6 border-b border-gray-200 pb-[0.5px]">
        <NavLink
          className={({ isActive }) =>
            `custom-tab-link hover:text-black text-gray-600 ${
              isActive ? "active" : ""
            }`
          }
          end
          to={"/employee/profile"}
        >
          Ish
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `custom-tab-link hover:text-black text-gray-600 ${
              isActive ? "active" : ""
            }`
          }
          to={"/employee/profile/expense"}
        >
          Maosh
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `custom-tab-link hover:text-black text-gray-600 ${
              isActive ? "active" : ""
            }`
          }
          to={"/employee/profile/payment"}
        >
          Kirim
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>

      <UserPopup
        open={isEditing}
        onClose={handleClose}
        prevData={user}
        currentRole={user?.role}
      />
    </div>
  );
};

export default React.memo(Profile);

// import React, { useState } from "react";
// import { Card, Avatar, Typography, Tag } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { useCheckTokenQuery } from "../../../redux/api/auth";
// import { FaPen } from "react-icons/fa";
// import EditProfile from "./EditProfile";

// const { Title, Text } = Typography;

// const Profile = () => {
//   const { data, error } = useCheckTokenQuery();
//   const [isEditing, setIsEditing] = useState(false);

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-[80vh]">
//         <Text type="danger">
//           Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi.
//         </Text>
//       </div>
//     );
//   }

//   const user = data?.user || {};

//   return (
//     <div className="flex flex-col items-center p-4">
//       <Card className="w-full max-w-[900px] shadow-md rounded-lg relative p-6">
//         <button
//           onClick={() => setIsEditing(true)}
//           className="absolute top-2 right-2 bg-white"
//         >
//           <FaPen className="text-gray-900 hover:text-gray-600 text-lg" />
//         </button>

//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           {/* Foydalanuvchi ma'lumotlari */}
//           <div className="flex items-center gap-4 md:gap-6">
//             <Avatar size={64} icon={<UserOutlined />} />
//             <div>
//               <Title level={2} className="text-center md:text-left">
//                 {user.f_name || "Ism yo'q"}
//               </Title>
//               <Title level={5} className="text-center md:text-left">
//                 {user.l_name || ""}
//               </Title>
//               <Text type="secondary" className="block text-center md:text-left">
//                 {user.username || "Username yo'q"}
//               </Text>
//               <Text className="block text-center md:text-left">
//                 {user.tel_primary || "Telefon yo'q"}
//               </Text>
//               <div className="mt-2 flex justify-center md:justify-start">
//                 <Tag color={user.is_active ? "green" : "red"}>
//                   {user.is_active ? "Faol" : "Faol emas"}
//                 </Tag>
//               </div>
//             </div>
//           </div>

//           {/* Balans */}
//           <div className="flex flex-col items-center md:items-end">
//             <Title
//               level={3}
//               type={user.budget >= 0 ? "success" : "danger"}
//               className="text-center md:text-right"
//             >
//               {user.budget?.toLocaleString() || "0"} UZS
//             </Title>
//           </div>
//         </div>
//       </Card>

//       <EditProfile
//         open={isEditing}
//         onClose={() => setIsEditing(false)}
//         user={user}
//       />
//     </div>
//   );
// };

// export default React.memo(Profile);
