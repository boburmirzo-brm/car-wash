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
import toast from "react-hot-toast";
import { MSAW, MSBW } from "@/static";
// import { useGetAllTariffQuery } from "../../redux/api/tariff";
// import { TariffItem } from "../../types";
import BonusWash from "./BonusWash";
import Invitations from "./Invitations";

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
  const [selectedInvitation, setSelectedInvitation] = useState<any>(null);
  const [apiMessage, contextHolder] = message.useMessage();
  const nasiya = Form.useWatch("nasiya", form);
  const washAmount = Form.useWatch("washAmount", form);
  const priceInputRef = useRef<InputRef>(null);
  const navigate = useNavigate();
  useModalNavigation(open, onClose);

  const amount = toNumber(washAmount);

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
    tariff?: string;
  }) => {
    if (prevData) {
      if (prevData.isBonus) {
        // const selectedTariff = 1000
        // tariffData?.data?.payload?.find(
        //   (item: TariffItem) => item._id === values.tariffId
        // );

        const washAmount = values?.tariff;
        // selectedTariff && selectedTariff.faza.length > 0
        //   ? selectedTariff.faza[0].price
        //   : toNumber(values.washAmount);

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

        let data: {
          washAmount: number;
          paidAmount: number;
          comment?: string;
          paymentType?: string;
          status: CarWashingStatus;
          invitationId?: string;
        } = {
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
          if (selectedInvitation) {
            data.invitationId = selectedInvitation._id;
            // data.washAmount =
            //   amount - amount * (selectedInvitation?.percent / 100);
            data.paidAmount =
              amount - amount * (selectedInvitation?.percent / 100);
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
        {prevData?.isBonus ? (
          <BonusWash />
        ) : prevData ? (
          <>
            {selectedInvitation && (
              <div className=" font-semibold text-lg">
                To'lanadigan summa :{" "}
                <span className="text-green-600">
                  {(
                    amount -
                    amount * (selectedInvitation?.percent / 100)
                  ).toLocaleString()}{" "}
                  so'm
                </span>
              </div>
            )}
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
                disabled={Boolean(selectedInvitation)}
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
              !prevData?.customerId?.tel_primary ||
              selectedInvitation
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
        {prevData && !nasiya && !prevData?.isBonus && (
          <Invitations
            id={customerId || ""}
            select={setSelectedInvitation}
            item={selectedInvitation}
            amount={amount}
          />
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
