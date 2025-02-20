import React, { FC } from "react";
import { Modal } from "antd";
import type { FormProps } from "antd";
import { Button, InputNumber, Form, Input } from "antd";

type FieldType = {
  price?: string;
  amount?: string;
};

interface Props {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const Payment: FC<Props> = ({ isModalOpen, handleOk, handleCancel }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    handleOk();
  };

  return (
    <Modal
      title="To'lov qilish"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Kelishilgan summa"
          name="price"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <InputNumber<number>
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="To'langan summa"
          name="amount"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(Payment);
