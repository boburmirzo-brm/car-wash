import React, { useState } from "react";
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
  const [signInUser, { isLoading }] = useSignInUserMutation();
  const [forbiddenError, setForbiddenError] = useState(false);
  const [otherError, setOtherError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setForbiddenError(false);
    setOtherError(null);

    signInUser(values)
      .unwrap()
      .then((response) => {
        dispatch(
          login({
            access_token: response?.data?.access_token,
            id: response?.data?.id,
          })
        );
        dispatch(setRole(response?.data?.role));
        if (response?.data?.role === "EMPLOYEE") {
          navigate(`/EMPLOYEE`);
        } else {
          navigate(`/`);
        }
      })
      .catch((err) => {
        if (err?.status === 403) {
          setForbiddenError(true);
        } else {
          setOtherError(err?.data?.message || "Login xatosi!");
        }
      });
  };

  return (
    <section className="w-full bg-bg min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-[450px] bg-white dark:bg-slate-900 w-full border p-4 border-border rounded-[6px]">
        <p className="text-2xl mb-5 text-text">Tizimga kirish</p>

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

          {forbiddenError && (
            <Alert
              message="Demo muddati tugagan. Iltimos, obuna sotib oling."
              description={
                <Button
                  type="link"
                  onClick={() => navigate("/subscription")}
                  style={{ paddingLeft: 0 }}
                >
                  To‘lov sahifasiga o‘tish
                </Button>
              }
              type="warning"
              showIcon
              style={{ marginBottom: "1rem" }}
            />
          )}

          {otherError && (
            <Alert
              message={otherError}
              type="error"
              showIcon
              style={{ marginBottom: "1rem" }}
            />
          )}

          <Form.Item>
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

        {/* 🔗 Ro‘yxatdan o‘tish havolasi */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Ro‘yxatdan o‘tmaganmisiz?{" "}
          <Button
            type="link"
            onClick={() => navigate("/register")}
            style={{ padding: 0 }}
          >
            Ro‘yxatdan o‘tish
          </Button>
        </p>
      </div>
    </section>
  );
};

export default React.memo(Login);
