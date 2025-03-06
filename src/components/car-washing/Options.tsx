import React, { useCallback, useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Popover, Button } from "antd";
import PaymentPopup from "../payment-popup/PaymentPopup";
import CustomerPopup from "../customer-popup/CustomerPopup";

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

  const handleClose = useCallback(()=> {
    setModalType(null)
  }, []) 

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

      {/* {modalType === "payment" && ( */}
        <PaymentPopup
          open={modalType === "payment"}
          onClose={handleClose}
          id={selectedId?.toString() || ""}
          name="John Doe"
          // prevData={{price: 5000, amount: 60000, _id: "asdsadsad"}}
        />
      {/* )} */}

      {/* {modalType === "edit" && ( */}
        <CustomerPopup
          open={modalType === "edit"}
          onClose={handleClose}
          customer={{
            full_name: "Abduhalilov Muhammadumar",
            tel_primary: "+998913431223",
            id: `${id}`,
          }}
        />
      {/* )} */}
    </>
  );
};

export default React.memo(Options);
