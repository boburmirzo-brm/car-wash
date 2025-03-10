import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Alert } from "antd";
import { ICarUpdate } from "@/types";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import { useCreateCarMutation, useUpdateCarMutation } from "@/redux/api/car";
import { checkErrorMessage } from "@/helper";

type FieldType = {
  plateNumber?: string;
  name: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  prevData?: ICarUpdate | undefined;
  customerId?: string;
}

const CarPopup: React.FC<Props> = ({ open, onClose, prevData, customerId }) => {
  const [form] = Form.useForm();
  const [createCar, { isLoading }] = useCreateCarMutation();
  const [updateCar, { isLoading: updateLoading }] = useUpdateCarMutation();
  const [error, setError] = useState<null | string>(null);
  const [apiMessage, contextHolder] = message.useMessage();

  useModalNavigation(open, onClose);

  const handleSave = (values: {
    plateNumber?: string;
    name: string;
    customerId?: string;
  }) => {
    if (prevData) {
      values.plateNumber = values?.plateNumber
        ?.replace(/\s/gi, "")
        ?.toUpperCase();
      updateCar({ id: prevData.id || "", data: values })
        .unwrap()
        .then(() => {
          apiMessage.success("Mashina ma'lumoti yangilandi!");
          setError(null);
          onClose();
        })
        .catch((err) => {
          setError(checkErrorMessage(err.data.message));
        });
    } else {
      values.customerId = customerId;
      values.plateNumber = values?.plateNumber
        ?.replace(/\s/gi, "")
        ?.toUpperCase();
      !values.plateNumber && delete values.plateNumber;

      createCar(values)
        .unwrap()
        .then(() => {
          apiMessage.success("Yangi mashina qo'shildi!");
          form.resetFields();
          setError(null);
          onClose();
        })
        .catch((err) => {
          setError(checkErrorMessage(err.data.message));
        });
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
    setError(null);
  };

  return (
    <Modal
      title={prevData ? `Mashina tahrirlash` : "Yangi mashina qo'shish"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        form={form}
        initialValues={{
          ...prevData,
          plateNumber: prevData?.plateNumber?.plateNumberFormat(),
        }}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item<FieldType>
          label="Mashina nomi"
          name="name"
          rules={[
            { required: true, message: "Iltimos, mashina nomini kiriting!" },
          ]}
          className="flex-1"
        >
          <Input placeholder="nomi" />
        </Form.Item>

        <Form.Item<FieldType> label="Mashina raqami" name="plateNumber">
          <Input placeholder="raqami" />
        </Form.Item>

        {error && (
          <div className="mb-3 mt-[-12px]">
            <Alert message={error} type="error" />
          </div>
        )}

        <Form.Item style={{ margin: 0 }}>
          <Button type="primary" loading={isLoading} block htmlType="submit">
            {isLoading || updateLoading
              ? "Kuting"
              : prevData
              ? "Saqlash"
              : "Qo'shish"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(CarPopup);
