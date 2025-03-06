import React, { FC, useRef, useEffect } from "react";
import { Modal, Button, Form, Input, Checkbox, InputRef } from "antd";
import type { FormProps } from "antd";
import { NumericFormat } from "react-number-format";
import { IPaymentAmount } from "@/types";

type FieldType = {
  price?: string;
  amount?: string;
  nasiya?: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  id: null | number;
  prevData?: IPaymentAmount | undefined;
}

const PaymentPopup: FC<Props> = ({ open, onClose, id, prevData }) => {
  const [form] = Form.useForm();

  const nasiya = Form.useWatch("nasiya", form);
  
  const priceInputRef = useRef<InputRef>(null);
  
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        priceInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log(values);
    const price =
      typeof values.price === "number"
        ? values.price
        : Number(values.price?.split(" ").join(""));
    const amount =
      typeof values.amount === "number"
        ? values.amount
        : Number(values.amount?.split(" ").join(""));

    let data = {
      price,
      amount: values.nasiya ? amount : price,
    };
    console.log("Success:", data);

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`To'lov qilish ${id}`}
      open={open}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      footer={null}
    >
      <Form
        form={form}
        // name="basic"
        layout="vertical"
        initialValues={prevData}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Kelishilgan summa"
          name="price"
          rules={[{ required: true, message: "Summani kiriting!" }]}
        >
          <NumericFormat
            className="w-full p-2 border border-gray-300 rounded-md"
            customInput={Input}
            thousandSeparator=" "
            fixedDecimalScale
            allowNegative={false}
            placeholder="Summani kiriting"
            getInputRef={priceInputRef}
          />
        </Form.Item>

        {nasiya && (
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
        )}

        <Form.Item<FieldType>
          name="nasiya"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Nasiya</Checkbox>
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(PaymentPopup);
