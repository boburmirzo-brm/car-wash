import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Alert, Radio } from "antd";
import { ISalaryUpdate } from "@/types";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import {
  useCreateSalaryMutation,
  useUpdateSalaryMutation,
} from "@/redux/api/salary";
import { NumericFormat } from "react-number-format";
import { checkErrorMessage, toNumber } from "@/helper";
import { SalaryType } from "@/constant";

type FieldType = {
  type: string;
  amount: number;
};

interface Props {
  open: boolean;
  onClose: () => void;
  prevData?: ISalaryUpdate | undefined;
  employeeId?: string;
}

const SalaryPopup: React.FC<Props> = ({
  open,
  onClose,
  prevData,
  employeeId,
}) => {
  const [form] = Form.useForm();
  const [createSalary, { isLoading }] = useCreateSalaryMutation();
  const [updateSalary, { isLoading: updateLoading }] =
    useUpdateSalaryMutation();
  const [error, setError] = useState<null | string>(null);
  const [apiMessage, contextHolder] = message.useMessage();

  useModalNavigation(open, onClose);

  const handleSave = (values: {
    type: string;
    amount: number;
    employerId?: string;
  }) => {
    values.amount = toNumber(values.amount);
    values.employerId = employeeId;

    if (prevData) {
      updateSalary({ id: prevData._id || "", data: values })
        .unwrap()
        .then(() => {
          apiMessage.success("Oylik ma'lumoti yangilandi!");
          setError(null);
          onClose();
        })
        .catch((err) => {
          setError(checkErrorMessage(err.data.message));
        });
    } else {
      createSalary(values)
        .unwrap()
        .then(() => {
          apiMessage.success("Oylik qo'shildi!");
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
      title={prevData ? `Oylik tahrirlash` : "Oylik qo'shish"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        form={form}
        initialValues={{
          ...prevData,
          type: prevData?.type || SalaryType.PERCENT,
        }}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item<FieldType>
          label="To'langan summa"
          name="amount"
          rules={[{ required: true, message: "To'lov summasini kiriting!" }]}
        >
          <NumericFormat
            className="w-full p-2 border border-gray-300 rounded-md"
            customInput={Input}
            thousandSeparator=" "
            fixedDecimalScale
            allowNegative={false}
            placeholder="Summani kiriting"
          />
        </Form.Item>
        <Form.Item<FieldType> label="To'lov turi" name="type">
          <Radio.Group
            options={[
              { value: SalaryType.PERCENT, label: "Foiz" },
              { value: SalaryType.CASH, label: "Naqd" },
            ]}
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

export default React.memo(SalaryPopup);
