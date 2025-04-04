import React, { FC, useRef, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputRef,
  message,
  Radio,
  // Select,
} from "antd";
import type { FormProps } from "antd";
import { NumericFormat } from "react-number-format";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import { PaymentType } from "@/constant";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "../../redux/api/expense";
// import { useGetUsersQuery } from "../../redux/api/user";

interface FieldType {
  amount?: string;
  comment?: string;
  type: PaymentType;
  employerId?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  employerId?: string | null;
  name: string;
  requiredComment?:boolean;
  expense?: {
    _id: string;
    amount: number;
    comment?: string;
    type: PaymentType;
    employerId?: string;
  };
}

const { TextArea } = Input;

const ExpensePopup: FC<Props> = ({
  open,
  onClose,
  employerId,
  expense,
  name,
  requiredComment
}) => {
  const [form] = Form.useForm();
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();
  // const { data } = useGetUsersQuery();
  // const users = data?.data?.payload || [];

  const [apiMessage, contextHolder] = message.useMessage();
  const priceInputRef = useRef<InputRef>(null);
  useModalNavigation(open, onClose);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        priceInputRef.current?.focus();
      }, 100);
    }
  }, [open, expense, employerId]);

  const toNumber = (value?: string): number => {
    return value ? Number(value.replace(/\s/g, "")) : 0;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const amount = toNumber(values.amount);
    if (!amount) {
      apiMessage.error("Summani to‘g‘ri kiriting!");
      return;
    }

    const data = {
      amount,
      comment: values.comment || "",
      type: values.type as PaymentType,
      employerId: employerId || null,
    };

    try {
      if (expense) {
        await updateExpense({ id: expense._id, data }).unwrap();
        apiMessage.success("Xarajat muvaffaqiyatli tahrirlandi!");
      } else {
        await createExpense(data).unwrap();
        apiMessage.success("Xarajat muvaffaqiyatli saqlandi!");
      }
      form.resetFields();
      onClose();
    } catch (err) {
      apiMessage.error("Xatolik yuz berdi, qaytadan urinib ko‘ring!");
      console.error("Xatolik:", err);
    }
  };

  return (
    <Modal
      title={
        expense ? `Xarajatni tahrirlash: ${name}` : `Yangi xarajat: ${name}`
      }
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          type: PaymentType.CASH,
          employerId: employerId || null,
          ...(expense ? expense : {}),
        }}
      >
        <Form.Item<FieldType>
          label="Xarajat summasi"
          name="amount"
          rules={[{ required: true, message: "Xarajat summasini kiriting!" }]}
        >
          <NumericFormat
            className="w-full p-2 border border-gray-300 rounded-md"
            customInput={Input}
            thousandSeparator=" "
            allowNegative={false}
            placeholder="Summani kiriting"
            getInputRef={priceInputRef}
            onValueChange={(values) =>
              form.setFieldValue("amount", values.value)
            }
          />
        </Form.Item>

        {/* <Form.Item<FieldType> label="Ishchi tanlang" name="employerId">
          <Select placeholder="Ishchini tanlang" allowClear>
            {users.map(
              (user: { _id: string; f_name: string; l_name: string }) => (
                <Select.Option key={user._id} value={user._id}>
                  {user.f_name} {user.l_name}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item> */}

        <Form.Item<FieldType>
          label="Izoh"
          name="comment"
          rules={[{ required: requiredComment, message: "Izoh kiriting!" }]}
        >
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
              : expense
              ? "Saqlash"
              : "Qo'shish"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(ExpensePopup);
