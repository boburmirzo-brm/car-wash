import React from "react";
import type { FormProps } from "antd";
import { Alert, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useSignInUserMutation } from "../../redux/api/auth";
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/features/role.slice";
import { login } from "../../redux/features/auth.slice";

type FieldType = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [signInUser, { isLoading, isError, error }] = useSignInUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    signInUser(values)
      .unwrap()
      .then((response) => {
        dispatch(login(response?.data?.access_token));
        dispatch(setRole(response?.data?.role));
        if (response?.data?.role == "EMPLOYEE") {
          navigate(`/EMPLOYEE`);
        } else {
          navigate(`/`);
        }
      });
  };

  return (
    <section className="w-full min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-[450px] w-full border p-4 border-gray-200 rounded-[6px]">
        <p className="text-2xl mb-5 text-gray-800">Ro'yhatdan o'tish</p>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
          {isError && (
            <Alert
              message={error?.data?.message || "Login xatosi!"}
              style={{ width: "100%", marginBottom: "1rem" }}
              type="error"
            />
          )}
          <Form.Item label={null} style={{ margin: 0 }}>
            <Button
              className="w-full"
              color="primary"
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default React.memo(Login);
