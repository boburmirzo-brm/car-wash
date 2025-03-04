import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { PatternFormat } from "react-number-format";

interface Customer {
  id: string;
  name: string;
  phone: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  customer?: Customer | null;
}

const CreateCustomerModal: React.FC<Props> = ({ open, onClose, customer }) => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");

  useEffect(() => {
    if (open && form) {
      if (customer) {
        form.setFieldsValue({
          name: customer.name,
          phone: customer.phone,
        });
        setName(customer.name);
      } else {
        form.resetFields();
        setName("");
      }
    }
  }, [open, customer, form]);

  const handleSave = (values: { name: string; phone?: string }) => {
    message.destroy();

    if (customer) {
      console.log("Mijoz yangilandi:", values);
      message.success("Mijoz ma'lumoti yangilandi!");
    } else {
      console.log("Yangi mijoz qo'shildi:", values);
      message.success("Yangi mijoz qo'shildi!");
      form.resetFields();
      setName("");
    }

    onClose();
  };

  const handleClose = () => {
    form.resetFields();
    setName("");
    onClose();
  };

  return (
    <Modal
      title={
        customer ? `Mijozni tahrirlash ${customer.id}` : "Yangi mijoz qo'shish"
      }
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <div className="flex gap-2">
          <Form.Item
            label="Ism"
            name="name"
            rules={[{ required: true, message: "Iltimos, ismni kiriting!" }]}
            className="flex-1"
          >
            <Input
              placeholder="Ism"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          {(!name.trim() || name == "Noma'lum") && (
            <Button
              type="default"
              className="mt-[30px]"
              style={{
                borderColor: name === "Noma'lum" ? "#22c55e" : "",
                color: name === "Noma'lum" ? "#22c55e" : "",
              }}
              onClick={() => {
                form.setFieldsValue({ name: "Noma'lum" });
                setName("Noma'lum");
              }}
            >
              Noma'lum
            </Button>
          )}
        </div>

        <Form.Item label="Telefon raqam" name="phone">
          <PatternFormat
            className="w-full h-10 px-3 border border-gray-300 rounded-md"
            format="+998 ## ### ## ##"
            mask={"_"}
            allowEmptyFormatting
            customInput={Input}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            {customer ? "Saqlash" : "Qo'shish"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(CreateCustomerModal);
