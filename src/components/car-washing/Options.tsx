import React, { FC, useCallback, useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Popover, Button } from "antd";
import CarWashingPopup from "../car-washing-popup/CarWashingPopup";

type ModalType = "car-washing" | "edit" | "done" | null;

interface Props {
  data: any;
  profile?: boolean;
}

const Options: FC<Props> = ({ data, profile }) => {
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const showModal = (type: ModalType) => {
    setSelected(data);
    setModalType(type);
    setOpen(false);
  };

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

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
          <Button onClick={() => showModal("done")} type="text">
            Tayyor
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

      {/* {modalType === "payment" && ( */}
      <CarWashingPopup
        open={modalType === "car-washing"}
        onClose={handleClose}
        customerId={selected?.customerId?._id}
        carId={selected?.carId?._id}
        prevData={data}
      />
      {/* )} */}
    </>
  );
};

export default React.memo(Options);
