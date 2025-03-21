import React, { FC, useState } from "react";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ExpensePopup from "@/components/expense-popup/ExpensePopup";
import { ExpenseType } from "@/types";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { PaymentType } from "@/constant";
import PaymentTypeTooltip from "@/components/payment/PaymentTypeTooltip";
import { Link } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Box from "@/components/ui/Box";

interface ExpenseItemType extends Omit<ExpenseType, "type"> {
  type: PaymentType;
}

interface Props {
  data: ExpenseType[];
  padding?: string;
}

const ExpenseView: FC<Props> = ({ data, padding="p-4" }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseItemType | null>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const handleEdit = (item: ExpenseType) => {
    const formattedItem: ExpenseItemType = {
      ...item,
      employerId: item.employerId._id || null,
      type: item.type as PaymentType,
    };
    setSelectedExpense(formattedItem);
    setIsEditing(true);
    setOpenPopover(null);
  };

  return (
    <div className={`space-y-4 ${padding}`}>
      {data?.map((item: ExpenseType, index: number) => (
        <Box key={item?._id || index}>
          <div className="flex items-center justify-between">
            <strong className="text-lg text-gray-900 font-semibold">
              {item?.amount?.toLocaleString()} UZS
            </strong>
            <Popover
              content={
                <Button onClick={() => handleEdit(item)} type="text">
                  Tahrirlash
                </Button>
              }
              trigger="click"
              placement="bottomRight"
              open={openPopover === item._id}
              onOpenChange={(visible) =>
                setOpenPopover(visible ? item._id : null)
              }
            >
              <Button type="text">
                <MoreOutlined />
              </Button>
            </Popover>
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm mb-3">
            <MdOutlineAdminPanelSettings className="text-lg " />
            <span>
              {item?.adminId?.l_name?.[0]}. {item?.adminId?.f_name}
            </span>
          </div>
          {item?.employerId && (
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <AiOutlineUser className="text-lg " />
              <Link
                className="hover:underline"
                to={`/employees/user/${item?.employerId?._id}`}
              >
                {item?.employerId?.l_name?.[0]}. {item?.employerId?.f_name}
              </Link>
            </div>
          )}

          {item?.comment && (
            <div className="text-gray-600 text-sm  flex items-center gap-2">
              <FaRegCommentDots className="text-lg" />
              <span>{item?.comment}</span>
            </div>
          )}
          <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
            <span>
              {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
            </span>
            <div className="flex items-center gap-2">
              <PaymentTypeTooltip type={item?.type} />
            </div>
          </div>
        </Box>
      ))}

      {isEditing && selectedExpense && (
        <ExpensePopup
          open={isEditing}
          onClose={() => setIsEditing(false)}
          employerId={selectedExpense?.employerId?._id}
          name="Xarajatni tahrirlash"
          expense={selectedExpense}
        />
      )}
    </div>
  );
};

export default React.memo(ExpenseView);
