import React, { FC, useCallback, useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Popover, Button, Popconfirm, message } from "antd";
import CarWashingPopup from "../car-washing-popup/CarWashingPopup";
import { useUpdateCarWashingMutation } from "@/redux/api/car-washing";
import { CarWashingStatus, PaymentType } from "@/constant";

type ModalType = "car-washing" | "edit" | "canceled" | null;

interface Props {
  data: any;
  profile?: boolean;
}

const Options: FC<Props> = ({ data, profile }) => {
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [updateCarWashing] = useUpdateCarWashingMutation();
  const [apiMessage, contextHolder] = message.useMessage();

  const showModal = (type: ModalType) => {
    setSelected(data);
    setModalType(type);
    setOpen(false);
  };

  const handleClose = useCallback((isBack?: boolean) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

  const handleCancele = () => {
    console.log(data?._id);

    updateCarWashing({
      id: data._id,
      data: {
        washAmount: 0,
        paidAmount: 0,
        paymentType: PaymentType.CASH,
        status: CarWashingStatus.CANCELED,
      },
    })
      .unwrap()
      .then(() => {
        apiMessage.warning("Mashina yuvish bekor qilindi!");
        handleClose();
      });
  };

  const content = (
    <div className="flex flex-col">
      {profile ? (
        <Button onClick={() => showModal("edit")} type="text">
          Tahrirlash
        </Button>
      ) : (
        <>
          <Button onClick={() => showModal("car-washing")} type="text">
            To'lov
          </Button>
          <Popconfirm
            title="Bekor qilmoqchimisiz?"
            onConfirm={handleCancele}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button type="text">Bekor qilish</Button>
          </Popconfirm>
        </>
      )}
    </div>
  );

  return (
    <>
      <Popover
        content={content}
        title=""
        trigger="click"
        placement="bottomRight"
        open={open}
        onOpenChange={setOpen}
      >
        <Button type="text">
          <MoreOutlined />
        </Button>
      </Popover>

      <CarWashingPopup
        open={modalType === "car-washing" || modalType === "edit"}
        onClose={handleClose}
        customerId={selected?.customerId?._id}
        carId={selected?.carId?._id}
        prevData={data}
      />

      {contextHolder}
    </>
  );
};

export default React.memo(Options);
