import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    console.log("Success:", values);
    navigate("/employer")
  };

  // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };
  return (
    <section className="w-full min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-[450px] w-full border p-4 border-gray-200 rounded-[6px]">
        <p className="text-2xl mb-5 text-gray-800">Ro'yhatdan o'tish</p>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username kiriting" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Parol"
            name="password"
            rules={[{ required: true, message: "Parol kiriting" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null} style={{margin:0}}>
            <Button className="w-full" color="primary" type="primary" htmlType="submit">
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default React.memo(Login);
