import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Alert,
  Checkbox,
  Radio,
  InputRef,
  Select,
} from "antd";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import { MdOutlineLocalCarWash } from "react-icons/md";
import {
  useCreateCarWashingMutation,
  useUpdateCarWashingChangeMutation,
  useUpdateCarWashingMutation,
} from "@/redux/api/car-washing";
import { CarWashingStatus, PaymentType } from "@/constant";
import { NumericFormat } from "react-number-format";
import TextArea from "antd/es/input/TextArea";
import { toNumber } from "@/helper";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MSAW, MSBW } from "@/static";
import { useGetAllTariffQuery } from "../../redux/api/tariff";
import { TariffItem } from "../../types";

type FieldType = {
  washAmount?: string;
  paidAmount?: string;
  nasiya?: string;
  comment: string;
  paymentType: string;
};

interface Props {
  open: boolean;
  onClose: (bool?: boolean) => void;
  prevData?: any;
  customerId?: string;
  carId?: string;
  profile?: boolean;
}

const CarWashingPopup: React.FC<Props> = ({
  open,
  onClose,
  prevData,
  customerId,
  carId,
  profile,
}) => {
  const [form] = Form.useForm();
  const [createCarWashing, { isLoading }] = useCreateCarWashingMutation();
  const [updateCarWashingChange, { isLoading: updateLoadingChange }] =
    useUpdateCarWashingChangeMutation();
  const [updateCarWashing, { isLoading: updateLoading }] =
    useUpdateCarWashingMutation();
  const [error, setError] = useState<null | string>(null);
  const [apiMessage, contextHolder] = message.useMessage();
  const nasiya = Form.useWatch("nasiya", form);
  const priceInputRef = useRef<InputRef>(null);
  const navigate = useNavigate();
  useModalNavigation(open, onClose);
  const { data: tariffData, isLoading: tariffLoading } = useGetAllTariffQuery(
    {}
  );
  const tariffOptions =
    tariffData?.data?.payload?.map((item: TariffItem) => {
      const minPrice = Math.min(...(item.faza?.map((f) => f.price) || [0]));
      return {
        label: `${item.class} - ${item.cars} (${
          item.comment
        }) - ${minPrice.toLocaleString()} so'm`,
        value: item._id, // SELECT uchun to‘g‘ri `value`
        price: minPrice,
      };
    }) || [];

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        priceInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSave = (values: {
    washAmount?: number;
    paidAmount?: number;
    status?: string;
    comment?: string;
    nasiya?: boolean;
    paymentType?: string;
    tariffId?: string;
  }) => {
    if (prevData) {
      // Handle the case when it's a bonus
      if (prevData.isBonus) {
        // Find the selected tariff to get the correct price
        const selectedTariff = tariffData?.data?.payload?.find(
          (item: TariffItem) => item._id === values.tariffId
        );

        // Get washAmount from the selected tariff if available
        const washAmount =
          selectedTariff && selectedTariff.faza.length > 0
            ? selectedTariff.faza[0].price
            : toNumber(values.washAmount);

        let data = {
          washAmount,
          paidAmount: 0, // Since it's a bonus, paid amount is 0
          comment: values.comment,
          paymentType: values.paymentType || "CASH",
          status: CarWashingStatus.COMPLETED,
        };

        if (!data.comment) {
          delete data.comment;
        }

        updateCarWashing({
          id: prevData._id,
          data,
        })
          .unwrap()
          .then(() => {
            toast.success(MSAW[Math.floor(Math.random() * MSAW.length)]);
            setError(null);
            onClose();
          })
          .catch((err) => {
            let error =
              typeof err.data.message === "string"
                ? err.data.message
                : err.data.message[0];
            setError(error);
          });
      } else {
        // Handle regular (non-bonus) case
        const washAmount = toNumber(values.washAmount);
        const paidAmount = toNumber(values.paidAmount);

        let data = {
          washAmount,
          paidAmount: values.nasiya ? paidAmount : washAmount,
          comment: values.comment,
          paymentType: values.paymentType,
          status: CarWashingStatus.COMPLETED,
        };

        if (!data.comment) {
          delete data.comment;
        }

        if (prevData.washAmount === null) {
          updateCarWashing({
            id: prevData._id,
            data,
          })
            .unwrap()
            .then(() => {
              toast.success(MSAW[Math.floor(Math.random() * MSAW.length)]);
              setError(null);
              onClose();
            })
            .catch((err) => {
              let error =
                typeof err.data.message === "string"
                  ? err.data.message
                  : err.data.message[0];
              setError(error);
            });
        } else {
          updateCarWashingChange({
            id: prevData._id,
            data,
          })
            .unwrap()
            .then(() => {
              apiMessage.success("Mashina ma'lumoti yangilandi!");
              setError(null);
              onClose();
            })
            .catch((err) => {
              let error =
                typeof err.data.message === "string"
                  ? err.data.message
                  : err.data.message[0];
              setError(error);
            });
        }
      }
    } else {
      // Create new car washing
      createCarWashing({
        carId: carId || "",
        customerId: customerId || "",
        status: CarWashingStatus.PENDING,
      })
        .unwrap()
        .then(() => {
          toast.success(MSBW[Math.floor(Math.random() * MSBW.length)]);
          form.resetFields();
          setError(null);
          onClose(true);
          navigate("/employee");
        })
        .catch((err) => {
          let error =
            typeof err.data.message === "string"
              ? err.data.message
              : err.data.message[0];
          setError(error);
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
      title={prevData ? `Mashina yuvish ` : "Mashina yuvishni boshlash"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      {prevData?.isBonus ? (
        <Form
          form={form}
          initialValues={
            prevData
              ? { ...prevData, paymentType: "CASH" }
              : { paymentType: "CASH" }
          }
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            label="Tariff tanlang"
            name="tariffId"
            rules={[{ required: true, message: "Tariffni tanlang!" }]}
          >
            <Select
              loading={tariffLoading}
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

                console.log(
                  "Selected Tariff:",
                  selectedTariff.faza.length,
                  "ID:",
                  selectedId,
                  "Amount:",
                  selectedTariff.faza[0].price
                );

                if (selectedTariff && selectedTariff.faza.length > 0) {
                  form.setFieldsValue({
                    washAmount: selectedTariff.faza[0].price,
                  });
                  console.log(selectedTariff.faza[0].price);
                }
              }}
            />
          </Form.Item>

          <Form.Item<FieldType> label="Izoh" name="comment">
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item style={{ margin: 0 }}>
            <Button
              type="primary"
              loading={isLoading || updateLoadingChange || updateLoading}
              block
              htmlType="submit"
            >
              {isLoading || updateLoading || updateLoadingChange
                ? "Kuting"
                : prevData
                ? "Saqlash"
                : "Qani kettik"}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          form={form}
          initialValues={
            prevData
              ? { ...prevData, paymentType: "CASH" }
              : { paymentType: "CASH" }
          }
          layout="vertical"
          onFinish={handleSave}
        >
          {prevData ? (
            <>
              <Form.Item<FieldType>
                label={nasiya ? "Kelishilgan summa" : "Summa"}
                name="washAmount"
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
                  name="paidAmount"
                  rules={[
                    { required: true, message: "To'lov summasini kiriting!" },
                  ]}
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
              {!profile && (
                <Form.Item<FieldType> label="To'lov turi" name="paymentType">
                  <Radio.Group
                    // value={value}
                    options={[
                      { value: PaymentType.CASH, label: "Naqd" },
                      { value: PaymentType.CARD, label: "Karta" },
                    ]}
                  />
                </Form.Item>
              )}

              {!(
                prevData?.customerId?.full_name === "Noma'lum" ||
                !prevData?.customerId?.tel_primary
              ) &&
                !profile && (
                  <Form.Item<FieldType> name="nasiya" valuePropName="checked">
                    <Checkbox>Nasiya</Checkbox>
                  </Form.Item>
                )}
            </>
          ) : (
            <div className="text-text-muted flex justify-center py-6 text-8xl">
              <MdOutlineLocalCarWash />
            </div>
          )}

          {error && (
            <div className="mb-3 mt-[-12px]">
              <Alert message={error} type="error" />
            </div>
          )}

          <Form.Item style={{ margin: 0 }}>
            <Button
              type="primary"
              loading={isLoading || updateLoadingChange || updateLoading}
              block
              htmlType="submit"
            >
              {isLoading || updateLoading || updateLoadingChange
                ? "Kuting"
                : prevData
                ? "Saqlash"
                : "Qani kettik"}
            </Button>
          </Form.Item>
        </Form>
      )}
      {contextHolder}
    </Modal>
  );
};

export default React.memo(CarWashingPopup);
