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
  console.log(profile);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        priceInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  console.log(prevData);

  const handleSave = (values: {
    washAmount: number;
    paidAmount?: number;
    status: string;
    comment: string;
    nasiya?: boolean;
    paymentType: string;
  }) => {
    if (prevData) {
      const washAmount = toNumber(values.washAmount);
      const paidAmount = toNumber(values.paidAmount);

      let data: {
        washAmount: number;
        paidAmount: number;
        comment?: string;
        paymentType: string;
        status: string;
        // customerId: string;
        // carId: string;
      } = {
        washAmount,
        paidAmount: values.nasiya ? paidAmount : washAmount,
        comment: values.comment,
        paymentType: values.paymentType,
        status: CarWashingStatus.COMPLETED,
        // customerId: customerId || "",
        // carId: carId || "",
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
    } else {
      createCarWashing({
        carId: carId || "",
        customerId: customerId || "",
        status: CarWashingStatus.PENDING,
      })
        .unwrap()
        .then(() => {
          apiMessage.success("Mashina yuvish boashlandi! +++");
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
      title={prevData ? `Mashina yuvish` : "Mashina yuvishni boshlash"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
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

            <Form.Item<FieldType> label="To'lov turi" name="paymentType">
              <Radio.Group
                // value={value}
                options={[
                  { value: PaymentType.CASH, label: "Naqd" },
                  { value: PaymentType.CARD, label: "Karta" },
                ]}
              />
              {/* <Select
            style={{ width: "100%" }}
            options={[
              { value: "CASH", label: "Naxt" },
              { value: "CARD", label: "Karta" },
            ]}
          /> */}
            </Form.Item>

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
          <div className="text-gray-600 flex justify-center py-6 text-8xl">
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
      {contextHolder}
    </Modal>
  );
};

export default React.memo(CarWashingPopup);
