import React, { useState } from "react";
import { Card, Typography, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useCheckTokenQuery } from "../../../redux/api/auth";
import { FaPen } from "react-icons/fa";
import EditProfile from "../../../components/edit-profile/EditProfile";

const { Title, Text } = Typography;

const Profile = () => {
  const { data, error } = useCheckTokenQuery();
  const [isEditing, setIsEditing] = useState(false);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Text type="danger">
          Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi.
        </Text>
      </div>
    );
  }

  const user = data?.user || {};

  return (
    <div className="flex flex-col items-center p-4">
      <Card className="w-full max-w-[900px] shadow-md rounded-lg relative p-4">
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 bg-white"
        >
          <FaPen className="text-gray-800 text-lg hover:text-gray-600" />
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 w-full">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-200 rounded-full">
              <UserOutlined className="text-3xl md:text-4xl text-gray-600" />
            </div>
            <div>
              <Title level={2} className="text-lg md:text-2xl text-start">
                {user.f_name || "Ism yo'q"}
              </Title>
              <Title level={5} className="text-sm md:text-lg text-start">
                {user.l_name || ""}
              </Title>
              <Text
                type="secondary"
                className="text-xs md:text-base block text-start"
              >
                {user.username || "Username yo'q"}
              </Text>
              <Text className="text-xs md:text-base block text-start">
                {user.tel_primary || "Telefon yo'q"}
              </Text>
              <div className="mt-1 md:mt-2">
                <Tag
                  color={user.is_active ? "green" : "red"}
                  className="text-xs md:text-sm"
                >
                  {user.is_active ? "Faol" : "Faol emas"}
                </Tag>
              </div>
            </div>
          </div>

          <div className="flex md:items-end w-full md:w-auto justify-center md:justify-start pr-5">
            <Title
              level={3}
              type={user.budget >= 0 ? "success" : "danger"}
              className="text-base md:text-2xl text-center md:text-end"
            >
              {user.budget?.toLocaleString() || "0"} UZS
            </Title>
          </div>
        </div>
      </Card>

      <EditProfile
        open={isEditing}
        onClose={() => setIsEditing(false)}
        user={user}
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
