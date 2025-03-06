// import React, { useEffect } from "react";
// import { Modal, Form, Input, Button, Select, message } from "antd";
// import {
//   useCreateAdminMutation,
//   useCreateEmployerMutation,
//   useUpdateUserMutation,
// } from "../../redux/api/user";
// import { PatternFormat } from "react-number-format";

// export enum Role {
//   OWNER = "OWNER",
//   ADMIN = "ADMIN",
//   EMPLOYEE = "EMPLOYEE",
// }

// interface EditProfileProps {
//   open: boolean;
//   onClose: () => void;
//   user?: any;
//   currentRole: Role;
// }

// const { Option } = Select;

// const EditProfile: React.FC<EditProfileProps> = ({
//   open,
//   onClose,
//   user,
//   currentRole,
// }) => {
//   const [form] = Form.useForm();
//   const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
//   const [createUser, { isLoading: creating }] = useCreateEmployerMutation();
//   const [createAdmin, { isLoading: creatingAdmin }] = useCreateAdminMutation();

//   useEffect(() => {
//     if (user) {
//       form.setFieldsValue({
//         f_name: user?.f_name,
//         l_name: user?.l_name,
//         username: user?.username,
//         tel_primary: user?.tel_primary,
//         tel_secondary: user?.tel_secondary,
//         address: user?.address,
//         role: user?.role,
//       });
//     } else {
//       form.resetFields();
//     }
//   }, [user, form]);

//   const handleSave = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         if (user) {
//           const userId = user?.id || user?._id;
//           return updateUser({ id: userId, data: values }).unwrap();
//         } else {
//           if (values.role === Role.ADMIN && currentRole !== Role.OWNER) {
//             message.error("Admin yaratish mumkin emas!");
//             return Promise.reject("Admin yaratish mumkin emas!");
//           }
//           if(values.role === Role.ADMIN){
//             return createAdmin(values).unwrap();
//           }
//           return createUser(values).unwrap();
//         }
//       })
//       .then((response) => {
//         message.success(
//           response?.message || "Amaliyot muvaffaqiyatli bajarildi!"
//         );
//         onClose();
//       })
//       .catch((error) => {
//         console.error("Xatolik:", error);
//         message.error(
//           error?.data?.message || "Amaliyot bajarishda xatolik yuz berdi!"
//         );
//       });
//   };

//   const isEditing = Boolean(user);
//   const isEmployee = currentRole === Role.EMPLOYEE;

//   return (
//     <Modal
//       title={isEditing ? "Profilni tahrirlash" : "Yangi foydalanuvchi yaratish"}
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       centered
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item
//           label="Ism"
//           name="f_name"
//           rules={[{ required: true, message: "Ism kiritish shart!" }]}
//         >
//           <Input placeholder="Ismingizni kiriting" />
//         </Form.Item>

//         <Form.Item
//           label="Familiya"
//           name="l_name"
//           rules={[{ required: true, message: "Familiya kiritish shart!" }]}
//         >
//           <Input placeholder="Familiyangizni kiriting" />
//         </Form.Item>

//         <Form.Item
//           label="Foydalanuvchi nomi"
//           name="username"
//           rules={[
//             { required: true, message: "Foydalanuvchi nomi kiritish shart!" },
//           ]}
//         >
//           <Input placeholder="Username" />
//         </Form.Item>

//         {!isEmployee && (
//           <>
//             <Form.Item
//               label="Asosiy telefon raqam"
//               name="tel_primary"
//               rules={[
//                 { required: true, message: "Telefon raqam kiritish shart!" },
//                 {
//                   pattern: /^\+998 \d{2}\ \d{3} \d{2} \d{2}$/,
//                   message: "Telefon raqam noto‘g‘ri! (+998 (90) 123 45 67)",
//                 },
//               ]}
//             >
//               <PatternFormat
//                 format="+998 ## ### ## ##"
//                 allowEmptyFormatting
//                 mask="_"
//                 customInput={Input}
//                 placeholder="+998 90 123 45 67"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Qo‘shimcha telefon raqam"
//               name="tel_secondary"
//               rules={[
//                 {
//                   pattern: /^\+998 \d{2}\ \d{3} \d{2} \d{2}$/,
//                   message: "Telefon raqam noto‘g‘ri! (+998 90 123 45 67)",
//                 },
//               ]}
//             >
//               <PatternFormat
//                 format="+998 ## ### ## ##"
//                 allowEmptyFormatting
//                 mask="_"
//                 customInput={Input}
//                 placeholder="+998 90 123 45 67"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Manzil"
//               name="address"
//               rules={[{ required: true, message: "Manzilni kiritish shart!" }]}
//             >
//               <Input placeholder="Tashkent, Uzbekistan" />
//             </Form.Item>

//             <Form.Item
//               label="Rol"
//               name="role"
//               rules={[{ required: true, message: "Rol tanlash shart!" }]}
//             >
//               <Select disabled={isEditing}>
//                 {currentRole === Role.ADMIN ? (
//                   <Option value={Role.EMPLOYEE}>Employee</Option>
//                 ) : (
//                   <>
//                     <Option value={Role.ADMIN}>Admin</Option>
//                     <Option value={Role.EMPLOYEE}>Employee</Option>
//                   </>
//                 )}
//               </Select>
//             </Form.Item>
//           </>
//         )}

//         {!isEditing && (
//           <Form.Item
//             label="Parol"
//             name="password"
//             rules={[{ required: true, message: "Parolni kiriting!" }]}
//           >
//             <Input.Password placeholder="Yangi parol" />
//           </Form.Item>
//         )}

//         <div className="flex justify-end gap-2">
//           <Button onClick={onClose} disabled={updating || creating || creatingAdmin}>
//             Bekor qilish
//           </Button>
//           <Button
//             type="primary"
//             onClick={handleSave}
//             loading={updating || creating}
//           >
//             {isEditing ? "Saqlash" : "Yaratish"}
//           </Button>
//         </div>
//       </Form>
//     </Modal>
//   );
// };

// export default React.memo(EditProfile);

import React from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import {
  useCreateAdminMutation,
  useCreateEmployerMutation,
  useUpdateUserMutation,
} from "@/redux/api/user";
import { PatternFormat } from "react-number-format";
import { Role } from "@/constant";

interface Props {
  open: boolean;
  onClose: () => void;
  user?: any;
  currentRole: Role;
}

const { Option } = Select;

const UserPopup: React.FC<Props> = ({ open, onClose, user, currentRole }) => {
  const [form] = Form.useForm();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [createUser, { isLoading: creating }] = useCreateEmployerMutation();
  const [createAdmin] = useCreateAdminMutation();

  // useEffect(() => {
  //   if (user) {
  //     form.setFieldsValue({
  //       f_name: user?.f_name,
  //       l_name: user?.l_name,
  //       username: user?.username,
  //       tel_primary: user?.tel_primary,
  //       tel_secondary: user?.tel_secondary,
  //       address: user?.address,
  //       role: user?.role,
  //     });
  //   } else {
  //     form.resetFields();
  //   }
  // }, [user, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (user) {
          const userId = user?.id || user?._id;
          return updateUser({ id: userId, data: values }).unwrap();
        } else {
          if (values.role === Role.ADMIN && currentRole !== Role.OWNER) {
            message.error("Admin yaratish mumkin emas!");
            return Promise.reject("Admin yaratish mumkin emas!");
          }
          if (values.role === Role.ADMIN) {
            return createAdmin(values).unwrap();
          }
          return createUser(values).unwrap();
        }
      })
      .then((response) => {
        message.success(
          response?.message || "Amaliyot muvaffaqiyatli bajarildi!"
        );
        onClose();
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        message.error(
          error?.data?.message || "Amaliyot bajarishda xatolik yuz berdi!"
        );
      });
  };

  const isEditing = Boolean(user);
  const isEmployee = currentRole === Role.EMPLOYEE;

  return (
    <Modal
      title={isEditing ? "Profilni tahrirlash" : "Yangi foydalanuvchi yaratish"}
      open={open}
      onCancel={onClose}
      footer={null}
      // centered
      className="max-w-[90vw] md:max-w-lg"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={user}
        className="space-y-3 md:space-y-5 p-2 md:p-4"
      >
        <Form.Item
          label="Ism"
          name="f_name"
          rules={[{ required: true, message: "Ism kiritish shart!" }]}
        >
          <Input placeholder="Ismingizni kiriting" />
        </Form.Item>

        <Form.Item
          label="Familiya"
          name="l_name"
          rules={[{ required: true, message: "Familiya kiritish shart!" }]}
        >
          <Input placeholder="Familiyangizni kiriting" />
        </Form.Item>

        <Form.Item
          label="Foydalanuvchi nomi"
          name="username"
          rules={[
            { required: true, message: "Foydalanuvchi nomi kiritish shart!" },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        {!isEmployee && (
          <>
            <Form.Item
              label="Asosiy telefon raqam"
              name="tel_primary"
              rules={[
                { required: true, message: "Telefon raqam kiritish shart!" },
                // {
                //   // pattern: /^\+998 \d{2}\ \d{3} \d{2} \d{2}$/,
                //   message: "Telefon raqam noto‘g‘ri! (+998 90 123 45 67)",
                // },
              ]}
            >
              <PatternFormat
                format="+998 ## ### ## ##"
                allowEmptyFormatting
                mask="_"
                customInput={Input}
                placeholder="+998 90 123 45 67"
              />
            </Form.Item>

            <Form.Item
              label="Qo‘shimcha telefon raqam"
              name="tel_secondary"
              rules={[
                // { 
                //   // pattern: /^\+998 \d{2}\ \d{3} \d{2} \d{2}$/,
                //   message: "Telefon raqam noto‘g‘ri! (+998 90 123 45 67)",
                // },
              ]}
            >
              <PatternFormat
                format="+998 ## ### ## ##"
                allowEmptyFormatting
                mask="_"
                customInput={Input}
                placeholder="+998 90 123 45 67"
              />
            </Form.Item>

            <Form.Item
              label="Manzil"
              name="address"
              rules={[{ required: true, message: "Manzilni kiritish shart!" }]}
            >
              <Input placeholder="Tashkent, Uzbekistan" />
            </Form.Item>

            <Form.Item
              label="Rol"
              name="role"
              rules={[{ required: true, message: "Rol tanlash shart!" }]}
            >
              <Select disabled={isEditing}>
                {currentRole === Role.ADMIN ? (
                  <Option value={Role.EMPLOYEE}>Employee</Option>
                ) : (
                  <>
                    <Option value={Role.ADMIN}>Admin</Option>
                    <Option value={Role.EMPLOYEE}>Employee</Option>
                  </>
                )}
              </Select>
            </Form.Item>
          </>
        )}

        {!isEditing && (
          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, message: "Parolni kiriting!" }]}
          >
            <Input.Password placeholder="Yangi parol" />
          </Form.Item>
        )}

        <Button
          type="primary"
          block
          onClick={handleSave}
          loading={updating || creating}
          // className="w-full md:w-auto"
        >
          {isEditing ? "Saqlash" : "Yaratish"}
        </Button>
      </Form>
    </Modal>
  );
};

export default React.memo(UserPopup);
