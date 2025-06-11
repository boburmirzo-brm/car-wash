import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateOwnerMutation } from "../../redux/api/auth";

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createOwner, { isLoading }] = useCreateOwnerMutation();

  const onFinish = async (values: any) => {
    try {
      await createOwner(values).unwrap();
      message.success("Ro'yxatdan o'tish muvaffaqiyatli!");
      navigate("/login");
    } catch (error: any) {
      message.error(error?.data?.message || "Xatolik yuz berdi");
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-800 shadow-md rounded-lg p-8 border border-gray-200 dark:border-slate-700">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          Yangi filial va egasini ro'yxatdan o'tkazish
        </h2>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-200">
                Filial nomi
              </span>
            }
            name="name"
            rules={[{ required: true, message: "Filial nomi majburiy" }]}
          >
            <Input className="dark:bg-slate-700 dark:text-white" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-200">Ism</span>
            }
            name="f_name"
            rules={[{ required: true, message: "Ism majburiy" }]}
          >
            <Input className="dark:bg-slate-700 dark:text-white" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-200">Familiya</span>
            }
            name="l_name"
            rules={[{ required: true, message: "Familiya majburiy" }]}
          >
            <Input className="dark:bg-slate-700 dark:text-white" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-200">
                Asosiy telefon raqam
              </span>
            }
            name="tel_primary"
            rules={[{ required: true, message: "Telefon raqami majburiy" }]}
          >
            <Input className="dark:bg-slate-700 dark:text-white" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-200">
                Qo‘shimcha telefon raqam
              </span>
            }
            name="tel_secondary"
          >
            <Input className="dark:bg-slate-700 dark:text-white" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-200">Manzil</span>
            }
            name="address"
            rules={[{ required: true, message: "Manzil majburiy" }]}
          >
            <Input className="dark:bg-slate-700 dark:text-white" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-200">
                Foydalanuvchi nomi
              </span>
            }
            name="username"
            rules={[{ required: true, message: "Username majburiy" }]}
          >
            <Input className="dark:bg-slate-700 dark:text-white" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-200">Parol</span>
            }
            name="password"
            rules={[{ required: true, message: "Parol majburiy" }]}
          >
            <Input.Password className="dark:bg-slate-700 dark:text-white" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Ro'yxatdan o'tish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default React.memo(SignUp);
