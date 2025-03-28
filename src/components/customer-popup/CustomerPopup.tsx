import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Alert } from "antd";
import { PatternFormat } from "react-number-format";
import { ICustomerUpdate } from "@/types";
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} from "@/redux/api/customer";
import { useNavigate } from "react-router-dom";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import { checkErrorMessage } from "@/helper";

interface Props {
  open: boolean;
  onClose: (isBack: boolean) => void;
  prevData?: ICustomerUpdate | undefined;
}

const CustomerPopup: React.FC<Props> = ({ open, onClose, prevData }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<null | string>(null);
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const [updateCustomer, { isLoading: updateLoading }] =
    useUpdateCustomerMutation();
  const navigate = useNavigate();
  const [apiMessage, contextHolder] = message.useMessage();
  const full_name = Form.useWatch("full_name", form) || "";

  useModalNavigation(open, onClose);

  const handleSave = (values: { full_name: string; tel_primary?: string }) => {
    values.tel_primary =
      values.tel_primary && values.tel_primary.replace(/\s/gi, "");
    !values.tel_primary && delete values.tel_primary;
    if (prevData) {
      if (values.tel_primary) {
        values.tel_primary =
          values?.tel_primary[0] === "+"
            ? values?.tel_primary
            : `+998${values?.tel_primary}`;
      }

      updateCustomer({ id: prevData.id || "", data: values })
        .unwrap()
        .then(() => {
          apiMessage.success("Mijoz ma'lumoti yangilandi!");
          setError(null);
          onClose(false);
        })
        .catch((err) => {
          setError(checkErrorMessage(err.data.message));
        });
    } else {
      createCustomer(values)
        .unwrap()
        .then((res) => {
          navigate(`/customer/${res.data._id}`);
          apiMessage.success("Yangi mijoz qo'shildi!");
          form.resetFields();
          setError(null);
          onClose(true);
        })
        .catch((err) => {
          setError(checkErrorMessage(err.data.message));
        });
      // setName("");
    }
  };

  const handleClose = () => {
    form.resetFields();
    // setName("");
    onClose(false);
    setError(null);
  };

  return (
    <Modal
      title={prevData ? `Mijozni tahrirlash` : "Yangi mijoz qo'shish"}
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
        <div className="flex gap-2">
          <Form.Item
            label="Ism"
            name="full_name"
            rules={[{ required: true, message: "Iltimos, ismni kiriting!" }]}
            className="flex-1"
          >
            <Input
              placeholder="Ism"
              // onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          {(!full_name.trim() || full_name === "Noma'lum") && (
            <Button
              type="default"
              className="mt-[30px]"
              style={{
                borderColor: full_name === "Noma'lum" ? "#22c55e" : "",
                color: full_name === "Noma'lum" ? "#22c55e" : "",
              }}
              onClick={() => {
                form.setFieldsValue({ full_name: "Noma'lum" });
                // setName("Noma'lum");
              }}
            >
              Noma'lum
            </Button>
          )}
        </div>

        <Form.Item label="Telefon raqam" name="tel_primary">
          <PatternFormat
            className="w-full px-2 border border-gray-300 rounded-md"
            format="+998 ## ### ## ##"
            mask={"_"}
            allowEmptyFormatting
            customInput={Input}
          />
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

export default React.memo(CustomerPopup);
