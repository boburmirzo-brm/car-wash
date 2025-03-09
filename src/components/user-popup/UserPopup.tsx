import React from "react";
import { Modal, Form, Input, Button,  message } from "antd";
import {
  useCreateAdminMutation,
  useCreateEmployerMutation,
  useUpdateUserMutation,
} from "@/redux/api/user";
import { PatternFormat } from "react-number-format";
import { Role } from "@/constant";
import { useModalNavigation } from "@/hooks/useModalNavigation";

interface Props {
  open: boolean;
  onClose: () => void;
  prevData?: any;
  currentRole: Role;
}


const UserPopup: React.FC<Props> = ({ open, onClose, prevData, currentRole }) => {
  const [form] = Form.useForm();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [createUser, { isLoading: creating }] = useCreateEmployerMutation();
  const [createAdmin] = useCreateAdminMutation();
  useModalNavigation(open, onClose);



  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        
        if (prevData) {
          const userId = prevData?.id || prevData?._id;
          return updateUser({ id: userId, data: values }).unwrap();
        } else {
          if (currentRole !== Role.OWNER) {
            message.error("Admin yaratish mumkin emas!");
            return Promise.reject("Admin yaratish mumkin emas!");
          }
          if (values.role === Role.ADMIN) {
            values.role = Role.ADMIN;
            console.log(values);
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

  const isEditing = Boolean(prevData);
  const isEmployee = currentRole === Role.EMPLOYEE;

  return (
    <Modal
      title={isEditing ? "Profilni tahrirlash" : "Yangi foydalanuvchi yaratish"}
      open={open}
      onCancel={()=>onClose()}
      footer={null}
      // centered
      className="max-w-[90vw] md:max-w-lg"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={prevData}
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

            {/* <Form.Item
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
            </Form.Item> */}
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
        >
          {isEditing ? "Saqlash" : "Yaratish"}
        </Button>
      </Form>
    </Modal>
  );
};

export default React.memo(UserPopup);
