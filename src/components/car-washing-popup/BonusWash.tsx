import React, { FC } from "react";
import { Form, Select } from "antd";
import { TariffItem } from "@/types";
import TextArea from "antd/es/input/TextArea";

type FieldType = {
  washAmount?: string;
  paidAmount?: string;
  nasiya?: string;
  comment: string;
  paymentType: string;
};
interface Props {
  tariffData?: any;
}

const BonusWash: FC<Props> = ({ tariffData }) => {
  const [form] = Form.useForm();

  const tariffOptions =
    tariffData?.data?.payload?.map((item: TariffItem) => {
      const minPrice = Math.min(...(item.faza?.map((f) => f.price) || [0]));
      return {
        label: `${item.class} - ${minPrice.toLocaleString()} so'm`,
        value: item._id,
        price: minPrice,
      };
    }) || [];
  return (
    <>
      <Form.Item
        label="Tariff tanlang"
        name="tariffId"
        rules={[{ required: true, message: "Tariffni tanlang!" }]}
      >
        <Select
          options={tariffOptions}
          placeholder="Tariffni tanlang"
          showSearch
          optionFilterProp="label"
          dropdownMatchSelectWidth={false}
          optionLabelProp="label"
          dropdownStyle={{ maxHeight: 250, overflowY: "auto" }}
          style={{ width: "100%" }}
          onChange={(selectedId) => {
            const selectedTariff = tariffData?.data?.payload?.find(
              (item: TariffItem) => item._id === selectedId
            );

            if (selectedTariff && selectedTariff.faza.length > 0) {
              form.setFieldsValue({
                washAmount: selectedTariff.faza[0].price,
              });
            }
          }}
        />
      </Form.Item>

      <Form.Item<FieldType> label="Izoh" name="comment">
        <TextArea rows={2} />
      </Form.Item>
    </>
  );
};

export default React.memo(BonusWash);
