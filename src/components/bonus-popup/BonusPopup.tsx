import React, { FC, useEffect } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import type { FormProps } from "antd";
import { NumericFormat } from "react-number-format";
import {
  useCreateBonusMutation,
  useUpdateBonusMutation,
} from "@/redux/api/bonus";
import { IBonus } from "../../types";

interface Props {
  open: boolean;
  onClose: () => void;
  bonus?: IBonus;
}

const BonusPopup: FC<Props> = ({ open, onClose, bonus }) => {
  const [form] = Form.useForm();
  const [createBonus, { isLoading: isCreating }] = useCreateBonusMutation();
  const [updateBonus, { isLoading: isUpdating }] = useUpdateBonusMutation();
  const [apiMessage, contextHolder] = message.useMessage();

  useEffect(() => {
    if (open) {
      if (bonus) {
        form.setFieldsValue({
          freeCounter: bonus.freeCounter.toString(),
          freeCounterAmount: bonus.freeCounterAmount.toString(),
          friendPercent: bonus.friendPercent.toString(),
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, bonus]);

  const onFinish: FormProps<IBonus>["onFinish"] = (values) => {
    const formattedValues = {
      freeCounter: Number(values.freeCounter.toString().replace(/\s/g, "")),
      freeCounterAmount: Number(
        values.freeCounterAmount.toString().replace(/\s/g, "")
      ),
      friendPercent: Number(values.friendPercent.toString().replace(/\s/g, "")),
    };

    if (
      values.freeCounter == null ||
      values.freeCounterAmount == null ||
      values.friendPercent == null
    ) {
      apiMessage.error("Barcha maydonlarni to‘ldiring!");
      return;
    }


    if (bonus) {
      const data = {
        id: bonus._id,
        data: formattedValues,
      };

      updateBonus(data)
        .unwrap()
        .then(() => {
          apiMessage.success("Bonus muvaffaqiyatli yangilandi!");
          form.resetFields();
          onClose();
        })
        .catch((err) => {
          console.error("Xatolik yuz berdi:", err);
        });
    } else {
      createBonus(formattedValues)
        .unwrap()
        .then(() => {
          apiMessage.success("Bonus muvaffaqiyatli qo‘shildi!");
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
      title={bonus ? "Bonusni tahrirlash" : "Bonus qo'shish"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<IBonus>
          label="Bonusgacha hisoblash soni"
          name="freeCounter"
          rules={[{ required: true, message: "Hisoblagichni kiriting!" }]}
        >
          <NumericFormat
            className="w-full p-2 border border-gray-300 rounded-md"
            customInput={Input}
            thousandSeparator=" "
            allowNegative={false}
            decimalScale={0}
            placeholder="Hisoblagich"
          />
        </Form.Item>

        <Form.Item<IBonus>
          label="Bonusgacha hisoblash summa"
          name="freeCounterAmount"
          rules={[{ required: true, message: "Summani kiriting!" }]}
        >
          <NumericFormat
            className="w-full p-2 border border-gray-300 rounded-md"
            customInput={Input}
            thousandSeparator=" "
            allowNegative={false}
            decimalScale={0}
            placeholder="Summa"
          />
        </Form.Item>

        <Form.Item<IBonus>
          label="Do‘stini chaqirgani uchun bonus foizi"
          name="friendPercent"
          rules={[{ required: true, message: "Foizni kiriting!" }]}
        >
          <NumericFormat
            className="w-full p-2 border border-gray-300 rounded-md"
            customInput={Input}
            thousandSeparator=" "
            allowNegative={false}
            isAllowed={(values) => {
              const { floatValue } = values;
              return (
                floatValue !== undefined && floatValue > 0 && floatValue <= 100
              );
            }}
            placeholder="Foiz"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isCreating || isUpdating}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            {isCreating || isUpdating
              ? "Kuting..."
              : bonus
              ? "Yangilash"
              : "Qo‘shish"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(BonusPopup);
