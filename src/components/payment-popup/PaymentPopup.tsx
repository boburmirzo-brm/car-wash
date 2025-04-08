import React, { FC, useRef, useEffect } from "react";
import { Modal, Button, Form, Input, InputRef, message, Radio } from "antd";
import type { FormProps } from "antd";
import { NumericFormat } from "react-number-format";
import { IPaymentAmount, IPaymentCreate } from "@/types";
import {
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
} from "@/redux/api/payment";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import { PaymentType } from "@/constant";

type FieldType = {
  amount?: string;
  comment: string;
  type: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  customerId: null | string;
  name: string;
  payment?: IPaymentAmount;
  // onlyPayment?: boolean;
}

const { TextArea } = Input;

const PaymentPopup: FC<Props> = ({
  open,
  onClose,
  customerId,
  payment,
  name,
}) => {
  const [form] = Form.useForm();
  const [createPayment, { isLoading: isCreating }] = useCreatePaymentMutation();
  const [updatePayment, { isLoading: isUpdating }] = useUpdatePaymentMutation();
  const [apiMessage, contextHolder] = message.useMessage();
  const priceInputRef = useRef<InputRef>(null);
  useModalNavigation(open, onClose);

  const toNumber = (value?: string | number): number => {
    if (typeof value === "string") {
      console.log("kirdi");
      
      return Number(value.replace(/\s/g, "")); // faqat string uchun
    }
    return Number(value) || 0; // Agar number bo'lsa, uni to'g'ridan-to'g'ri raqamga aylantiradi
  };


  useEffect(() => {
    if (open) {
      setTimeout(() => {
        priceInputRef.current?.focus();
      }, 100);
      // if (payment) {
      //   form.setFieldsValue({
      //     amount: payment.amount.toString(),
      //     comment: payment.comment,
      //     type: payment.type,
      //   });
      // }
    }
  }, [open, payment]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const amount = toNumber(values.amount);    

    if (!amount) {
      apiMessage.error("Summani to‘g‘ri kiriting!");
      return;
    }

    if (payment) {
      const data = {
        id: payment._id,
        data: {
          amount,
          comment: values.comment || "",
          type: values.type,
        },
      };

      updatePayment(data)
        .unwrap()
        .then(() => {
          apiMessage.success("To'lov muvaffaqiyatli tahrirlandi!");
          form.resetFields();
          onClose();
        })
        .catch((err) => {
          console.error("Xatolik yuz berdi:", err);
        });
    } else {
      const data: IPaymentCreate = {
        amount,
        comment: values.comment,
        type: values.type,
        customerId: customerId || "",
      };
      if (!data.comment) delete data.comment;

      createPayment(data)
        .unwrap()
        .then(() => {
          apiMessage.success("To'lov muvaffaqiyatli saqlandi!");
          form.resetFields();
          onClose();
        })
        .catch((err) => {
          console.error("Xatolik yuz berdi:", err);
        });
    }
  };
  return (
    <Modal
      title={payment ? `To'lovni tahrirlash: ${name}` : `To'lov: ${name}`}
      open={open}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={payment ? payment : { type: PaymentType.CASH }}
        onFinish={onFinish}
        autoComplete="off"
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
            onValueChange={(values) =>
              form.setFieldValue("amount", values.value)
            } // `values.value` faqat raqamni oladi
          />
        </Form.Item>

        <Form.Item<FieldType> label="Izoh" name="comment">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item<FieldType> label="To'lov turi" name="type">
          <Radio.Group
            options={[
              { value: PaymentType.CASH, label: "Naqd" },
              { value: PaymentType.CARD, label: "Karta" },
            ]}
          />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button
            loading={isCreating || isUpdating}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            {isCreating || isUpdating
              ? "Kuting"
              : payment
              ? "Saqlash"
              : "Qo'shish"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(PaymentPopup);
