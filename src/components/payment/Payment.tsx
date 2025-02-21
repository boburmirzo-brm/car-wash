import React, { FC, useRef, useEffect } from "react";
import { Modal, Button, Form, Input, Checkbox, InputRef } from "antd";
import type { FormProps } from "antd";
import { NumericFormat } from "react-number-format";

type FieldType = {
  price?: string;
  amount?: string;
  nasiya?: string;
};

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  id: null | number;
  data?: any;
}

const Payment: FC<Props> = ({ isModalOpen, handleCancel, id, data }) => {
  const [form] = Form.useForm();

  const nasiya = Form.useWatch("nasiya", form)

  const priceInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        priceInputRef.current?.focus(); 
      }, 100);
    }
  }, [isModalOpen]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const price = Number(values.price?.split(" ").join(""))
    const amount = Number(values.amount?.split(" ").join(""))
    
    let data = {
      price,
      amount: values.nasiya ? amount : price
    }
    console.log("Success:", data);  

    form.resetFields();
    handleCancel();
  };

  return (
    <Modal
      title={`To'lov qilish ${id}`}
      open={isModalOpen}
      onCancel={()=> {
        handleCancel()
        form.resetFields();
      }}
      footer={null}
    >
      <Form
        form={form}
        // name="basic"
        layout="vertical"
        initialValues={data}
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

export default React.memo(Payment);
