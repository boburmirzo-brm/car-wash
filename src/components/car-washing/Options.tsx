import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Popover, Button } from "antd";
import Payment from "../payment/Payment";
import CreateCustomerModal from "../create-customer/CreateCustomerModal";

type ModalType = "payment" | "edit" | null;

const Options = ({ id }: { id: number }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const showModal = (type: ModalType) => {
    setSelectedId(id);
    setModalType(type);
    setOpen(false);
  };

  const handleClose = () => setModalType(null);

  const content = (
    <div className="flex flex-col">
      <Button onClick={() => showModal("payment")} type="text">
        To'lov
      </Button>
      <Button onClick={() => showModal("edit")} type="text">
        Tahrirlash
      </Button>
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

      {modalType === "payment" && (
        <Payment
          isModalOpen={true}
          handleCancel={handleClose}
          id={selectedId}
        />
      )}

      {modalType === "edit" && (
        <CreateCustomerModal
          open={true}
          onClose={handleClose}
          customer={{
            name: "Abduhalilov Muhammadumar",
            phone: "+998913431223",
            id: `${id}`,
          }}
        />
      )}
    </>
  );
};

export default React.memo(Options);
