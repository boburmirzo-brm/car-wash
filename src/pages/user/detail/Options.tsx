import React, { useState } from "react";
import { Button, Popconfirm, Popover } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { LuUserMinus, LuUserPlus } from "react-icons/lu";
import { MdOutlinePercent } from "react-icons/md";
import { MoreOutlined } from "@ant-design/icons";

interface OptionsProps {
  isActive: boolean;
  onToggleStatus: () => void;
  onEdit: () => void;
  onSalary: () => void;
  onExpense: () => void;
}

const Options: React.FC<OptionsProps> = ({
  isActive,
  onToggleStatus,
  onEdit,
  onSalary,
}) => {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex flex-col gap-1  min-w-[160px]">
      <Popconfirm
        title={isActive ? "Ishdan olish" : "Ishga qaytarish"}
        description={
          isActive
            ? "Chindan ham ishdan olmoqchimisiz?"
            : "Foydalanuvchini ishga qaytarmoqchimisiz?"
        }
        onConfirm={() => {
          onToggleStatus();
          setOpen(false);
        }}
        okText="Ha"
        cancelText="Yo'q"
      >
        <Button
          type="text"
          danger
          style={{justifyContent: "flex-start"}}
          className="flex  gap-2  w-full"
        >
          {isActive ? (
            <LuUserMinus className="text-lg" />
          ) : (
            <LuUserPlus className="text-lg" />
          )}
          <span>{isActive ? "Ishdan olish" : "Ishga qaytarish"}</span>
        </Button>
      </Popconfirm>

      <Button
        onClick={() => {
          onEdit();
          setOpen(false);
        }}
        type="text"
        style={{justifyContent: "flex-start"}}
        className="flex  gap-2  w-full"
      >
        <FaRegEdit className="text-lg" />
        <span>Tahrirlash</span>
      </Button>

      <Button
        onClick={() => {
          onSalary();
          setOpen(false);
        }}
        type="text"
        style={{justifyContent: "flex-start"}}
        className="flex  gap-2  w-full"
      >
        <MdOutlinePercent className="text-lg" />
        <span>Oylik</span>
      </Button>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomRight"
      open={open}
      onOpenChange={setOpen}
    >
      <Button type="text">
        <MoreOutlined />
      </Button>
    </Popover>
  );
};

export default Options;
