import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Popover, Button } from "antd";
import Payment from "../payment/Payment";

const Options = ({ id }: { id: number }) => {
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const [open, setOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePayment = () => {
    console.log("Payment for: ", selectedId);
    setOpen(false)
    showModal()
  };
  const content = (
    <div className="flex flex-col">
      <Button onClick={handlePayment} type="text">
        To'lov
      </Button>
      <Button type="text">Tahrirlash</Button>
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
        onOpenChange={() => setOpen(true)}
      >
        <Button onClick={()=>setSelectedId(id)} type="text">
          <MoreOutlined />
        </Button>
      </Popover>
      <Payment handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen}/>
    </>
  );
};

export default React.memo(Options);
