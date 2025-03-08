import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Alert } from "antd";
import { ICarWashingUpdate } from "@/types";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import { MdOutlineLocalCarWash } from "react-icons/md";
import {
  useCreateCarWashingMutation,
  useUpdateCarWashingMutation,
} from "@/redux/api/car-washing";
import { CarWashingStatus } from "@/constant";

interface Props {
  open: boolean;
  onClose: () => void;
  prevData?: ICarWashingUpdate | undefined;
  customerId?: string;
  carId?: string;
}

const CarWashingPopup: React.FC<Props> = ({
  open,
  onClose,
  prevData,
  customerId,
  carId,
}) => {
  const [form] = Form.useForm();
  const [createCarWashing, { isLoading }] = useCreateCarWashingMutation();
  const [updateCarWashing, { isLoading: updateLoading }] =
    useUpdateCarWashingMutation();
  const [error, setError] = useState<null | string>(null);
  const [apiMessage, contextHolder] = message.useMessage();

  useModalNavigation(open, onClose);

  const handleSave = (values: {
    washAmount: number;
    status: string;
    comment: string;
  }) => {
    console.log(customerId);
    console.log(values);

    if (prevData) {
      updateCarWashing({
        id: prevData.id || "",
        data: {
          carId: carId || "",
          customerId: customerId || "",
          status: CarWashingStatus.COMPLETED,
          washAmount: 75000,
          comment: "Lorem ipsum", // optional
        },
      })
        .unwrap()
        .then(() => {
          apiMessage.success("Mashina ma'lumoti yangilandi!");
          setError(null);
          onClose();
        })
        .catch((err) => {
          let error =
            typeof err.data.message === "string"
              ? err.data.message
              : err.data.message[0];
          setError(error);
        });
    } else {
      createCarWashing({
        carId: carId || "",
        customerId: customerId || "",
        status: CarWashingStatus.PENDING,
      })
        .unwrap()
        .then(() => {
          apiMessage.success("Mashina yuvish boashlandi!");
          form.resetFields();
          setError(null);
          onClose();
        })
        .catch((err) => {
          let error =
            typeof err.data.message === "string"
              ? err.data.message
              : err.data.message[0];
          setError(error);
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
      title={
        prevData ? `Mashina yuvishni tahrirlash` : "Mashina yuvishni boshlash"
      }
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        form={form}
        initialValues={prevData}
        layout="vertical"
        onFinish={handleSave}
      >
        {prevData ? (
          <>
            <Form.Item
              label="Mashina nomi"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Iltimos, mashina nomini kiriting!",
                },
              ]}
              className="flex-1"
            >
              <Input placeholder="nomi" />
            </Form.Item>

            <Form.Item label="Mashina raqami" name="plateNumber">
              <Input placeholder="raqami" />
            </Form.Item>
          </>
        ) : (
          <div className="text-gray-600 flex justify-center py-6 text-8xl">
            <MdOutlineLocalCarWash />
          </div>
        )}

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
              : "Qani kettik"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(CarWashingPopup);
