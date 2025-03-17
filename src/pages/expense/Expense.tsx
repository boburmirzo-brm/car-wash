import React, { FC, useState } from "react";
import { Button, Popover, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ExpensePopup from "../../components/expense-popup/ExpensePopup";
import { ExpenseType } from "../../types";
import {
  FaRegCreditCard,
  FaMoneyBillWave,
  FaRegCommentDots,
} from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { PaymentType } from "../../constant";

interface ExpenseItemType extends Omit<ExpenseType, "type"> {
  type: PaymentType;
}

interface Props {
  data: ExpenseType[];
}

const ExpenseView: FC<Props> = ({ data }) => {
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
    <div className="my-4 space-y-4 m-2">
      {data?.map((item: ExpenseType, index: number) => {
        const expenseType = item?.type as PaymentType;

        return (
          <div
            key={item?._id || index}
            className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300 relative"
          >
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
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              {item?.employerId && (
                <>
                  <AiOutlineUser className="text-lg" />
                  <span>
                    {item.employerId.l_name?.[0]}. {item.employerId.f_name}
                  </span>
                </>
              )}
            </p>

            {item?.comment && (
              <div className="text-gray-600 text-sm mt-3 flex items-center gap-2">
                <FaRegCommentDots className="text-lg" />
                <span>{item?.comment}</span>
              </div>
            )}
            <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
              <span>
                {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
              </span>
              <div className="flex items-center gap-2">
                {expenseType == PaymentType.CASH ? (
                  <Tooltip placement="bottom" title="Naqd">
                    <div>
                      <FaMoneyBillWave className="text-xl" />
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip placement="bottom" title="Karta">
                    <div>
                      <FaRegCreditCard className="text-xl" />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        );
      })}

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
