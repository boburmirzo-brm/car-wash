import React, { FC, useCallback, useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Popover, Button, message } from "antd";
import CarWashingPopup from "../car-washing-popup/CarWashingPopup";
import CancelModal from "./CancelPopUp"; // ✅ Yangi modal
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

  const handleCancel = (comment: string) => {
    updateCarWashing({
      id: data._id,
      data: {
        washAmount: 0,
        paidAmount: 0,
        paymentType: PaymentType.CASH,
        status: CarWashingStatus.CANCELED,
        comment: comment,
      },
    })
      .unwrap()
      .then(() => {
        apiMessage.warning("Mashina yuvish bekor qilindi!");
        setModalType(null);
        handleClose(true);
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
          <Button type="text" onClick={() => showModal("canceled")}>
            Bekor qilish
          </Button>
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

      {(modalType === "car-washing" || modalType === "edit") && (
        <CarWashingPopup
          open={modalType === "car-washing" || modalType === "edit"}
          onClose={handleClose}
          customerId={selected?.customerId?._id}
          carId={selected?.carId?._id}
          prevData={data}
          profile={profile}
        />
      )}

      <CancelModal
        open={modalType === "canceled"}
        onClose={() => setModalType(null)}
        onConfirm={handleCancel}
      />

      {contextHolder}
    </>
  );
};

export default React.memo(Options);
