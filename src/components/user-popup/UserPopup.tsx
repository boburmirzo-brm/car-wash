import React, { useState } from "react";
import { Modal, Form, Input, Button, message, FormProps, Alert } from "antd";
import {
  useCreateAdminMutation,
  useCreateEmployerMutation,
  useUpdateUserMutation,
} from "@/redux/api/user";
import { PatternFormat } from "react-number-format";
import { Role } from "@/constant";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import { checkErrorMessage } from "@/helper";

type FieldType = {
  f_name: string;
  l_name: string;
  username: string;
  tel_primary: string;
  tel_secondary?: string;
  address: string;
  password?: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  prevData?: any;
  currentRole: Role;
}

const UserPopup: React.FC<Props> = ({
  open,
  onClose,
  prevData,
  currentRole,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<null | string>(null);
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [createUser, { isLoading: creating }] = useCreateEmployerMutation();
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const [apiMessage, contextHolder] = message.useMessage();
  useModalNavigation(open, onClose);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (prevData) {
      !values.password && delete values.password;

      updateUser({ id: prevData.id || prevData._id, data: values })
        .unwrap()
        .then(() => {
          apiMessage.success("Hodim muvaffaqiyatli o'zgartirildi!");
          onClose();
          form.resetFields();
        })
        .catch((err) => {
          setError(checkErrorMessage(err.data.message));
        });
    } else {
      if (currentRole === Role.OWNER) {
        !values.tel_secondary && delete values.tel_secondary;
        createAdmin({ ...values, role: Role.ADMIN })
          .unwrap()
          .then(() => {
            apiMessage.success("Admin muvaffaqiyatli qo'shildi!");
            onClose();
            form.resetFields();
          })
          .catch((err) => {
            setError(checkErrorMessage(err.data.message));
          });
      } else {
        !values.tel_secondary && delete values.tel_secondary;
        createUser({ ...values, role: Role.EMPLOYEE })
          .unwrap()
          .then(() => {
            apiMessage.success("Hodim muvaffaqiyatli qo'shildi!");
            onClose();
            form.resetFields();
          })
          .catch((err) => {
            setError(checkErrorMessage(err.data.message));
          });
      }
    }
  };
  const handleClose = () => {
    form.resetFields();
    onClose();
    setError(null);
  };

  const isEditing = Boolean(prevData);
  const isEmployee = currentRole === Role.EMPLOYEE;

  return (
    <Modal
      title={isEditing ? "Profilni tahrirlash" : "Yangi foydalanuvchi yaratish"}
      open={open}
      onCancel={handleClose}
      footer={null}
      // centered
      className="max-w-[90vw] md:max-w-lg"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={prevData}
        onFinish={onFinish}
        className="space-y-3 md:space-y-5 p-2 md:p-4"
        autoComplete="off"
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

            <Form.Item label="Qo‘shimcha telefon raqam" name="tel_secondary">
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
              label="Parol"
              name="password"
              rules={[{ required: !isEditing, message: "Parolni kiriting!" }]}
            >
              <Input.Password placeholder="Yangi parol" />
            </Form.Item>
          </>
        )}

        {error && (
          <div className="mb-3 mt-[-12px]">
            <Alert message={error} type="error" />
          </div>
        )}
        <Form.Item style={{ margin: 0 }}>
          <Button
            type="primary"
            block
            htmlType="submit"
            // onClick={handleSave}
            loading={updating || creating || isLoading}
          >
            {updating || creating || isLoading
              ? "Kuting..."
              : isEditing
              ? "Saqlash"
              : "Yaratish"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(UserPopup);
