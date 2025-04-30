import React, { useEffect } from "react";
import { Modal, Form, Input, Button, InputNumber, Space, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { TariffItem } from "../../types";
import {
  useCreateTariffMutation,
  useUpdateTariffMutation,
} from "../../redux/api/tariff";
import { NumericFormat } from "react-number-format";

type Props = {
  open: boolean;
  onClose: () => void;
  selected?: TariffItem;
};

const TariffPopup: React.FC<Props> = ({ open, onClose, selected }) => {
  const [form] = Form.useForm();
  const [createTariff, { isLoading: isCreating }] = useCreateTariffMutation();
  const [updateTariff, { isLoading: isUpdating }] = useUpdateTariffMutation();

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (selected) {
        form.setFieldsValue({
          ...selected,
          faza: selected.faza.map((f) => ({
            number: f.number,
            price: f.price,
          })),
        });
      }
    }
  }, [open, selected, form]);

  const handleFinish = async (values: any) => {
    try {
      const cleanedValues = {
        ...values,
        faza: values.faza.map((f: any) => ({
          number: f.number,
          price: Number(f.price.toString().replace(/\s/g, "")),
        })),
      };

      if (selected) {
        await updateTariff({ id: selected._id, data: cleanedValues }).unwrap();
        message.success("Tarif yangilandi");
      } else {
        await createTariff(cleanedValues).unwrap();
        message.success("Yangi tarif qo‘shildi");
      }

      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Xatolik yuz berdi");
      console.error("Tariff mutation error:", error);
    }
  };


  return (
    <Modal
      title={selected ? "Tarifni tahrirlash" : "Yangi tarif qo‘shish"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={() => form.submit()}
      okText={selected ? "Saqlash" : "Qo‘shish"}
      cancelText="Bekor qilish"
      confirmLoading={isCreating || isUpdating}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Mashina toifasi"
          name="class"
          rules={[{ required: true, message: "Toifa kiriting" }]}
        >
          <Input placeholder="Masalan: A" />
        </Form.Item>

        <Form.Item
          label="Mashina nomi"
          name="cars"
          rules={[{ required: true, message: "Mashina nomi kerak" }]}
        >
          <Input placeholder="Masalan: Damas" />
        </Form.Item>

        <Form.Item
          label="Izoh"
          name="comment"
          rules={[{ required: true, message: "Izoh yozing" }]}
        >
          <Input.TextArea rows={3} placeholder="Masalan: faqat Damas uchun" />
        </Form.Item>

        <Form.List name="faza">
          {(fields, { add, remove }) => (
            <>
              <label>Fazalar:</label>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "number"]}
                    rules={[{ required: true, message: "№ kerak" }]}
                  >
                    <InputNumber
                      placeholder="№"
                      min={1}
                      value={index + 1}
                      disabled
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "Narx kerak" }]}
                  >
                    <NumericFormat
                      className="w-full p-2 border border-gray-300 rounded-md"
                      customInput={Input}
                      thousandSeparator=" "
                      allowNegative={false}
                      decimalScale={0}
                      placeholder="Narxi (so'mda)"
                      onValueChange={(values) => {
                        const floatValue = values.floatValue || 0;
                        const faza = form.getFieldValue("faza");
                        if (faza && faza[name]) {
                          faza[name].price = floatValue;
                          form.setFieldsValue({ faza });
                        }
                      }}
                    />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: "red" }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() =>
                    add({ number: fields.length + 1, price: undefined })
                  }
                  block
                  icon={<PlusOutlined />}
                >
                  Faza qo‘shish
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default TariffPopup;
