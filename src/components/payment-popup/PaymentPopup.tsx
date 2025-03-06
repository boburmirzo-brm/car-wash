import React, { FC, useRef, useEffect } from "react";
import { Modal, Button, Form, Input, Checkbox, InputRef, Select, message } from "antd";
import type { FormProps } from "antd";
import { NumericFormat } from "react-number-format";
import { IPaymentAmount, IPaymentCreate } from "@/types";
import { useCreatePaymentMutation } from "@/redux/api/payment";

type FieldType = {
  price?: string;
  amount?: string;
  nasiya?: string;
  comment: string;
  type: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  id: null | string;
  name: string;
  onlyPayment?: boolean;
  prevData?: IPaymentAmount | undefined;
}
const { TextArea } = Input;
const PaymentPopup: FC<Props> = ({
  open,
  onClose,
  // id,
  prevData,
  onlyPayment = false,
  name,
}) => {
  const [form] = Form.useForm();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const [apiMessage, contextHolder] = message.useMessage();
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
    const price =
      typeof values.price === "number"
        ? values.price
        : Number(values.price?.split(" ").join(""));
    const amount =
      typeof values.amount === "number"
        ? values.amount
        : Number(values.amount?.split(" ").join(""));

    let data: IPaymentCreate = {
      price,
      amount: values.nasiya ? amount : price,
      comment: values.comment,
      type: values.type,
    };
    !data.comment && delete data.comment;

    console.log(data);

    createPayment(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        apiMessage.success("To'lov muvaffaqiyatli saqlandi!");
        form.resetFields();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <Modal
      title={`To'lov: ${name}`}
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
        initialValues={prevData ? prevData : { type: "CASH" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label={nasiya ? "Kelishilgan summa" : "Summa"}
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

        <Form.Item<FieldType> label="Izoh" name="comment">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item<FieldType> label="To'lov turi" name="type">
          <Select
            style={{ width: "100%" }}
            // defaultValue="CASH"
            // onChange={handleChange}
            options={[
              { value: "CASH", label: "Naxt" },
              { value: "CARD", label: "Karta" },
            ]}
          />
        </Form.Item>

        {!onlyPayment && (
          <Form.Item<FieldType>
            name="nasiya"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Nasiya</Checkbox>
          </Form.Item>
        )}

        <Form.Item style={{ margin: 0 }}>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(PaymentPopup);
