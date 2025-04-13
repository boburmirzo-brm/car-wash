import React, { FC, useState } from "react";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ExpensePopup from "@/components/expense-popup/ExpensePopup";
import { ExpenseType } from "@/types";
import { FaRegCommentDots } from "react-icons/fa";
import { PaymentType, Role } from "@/constant";
import PaymentTypeTooltip from "@/components/payment/PaymentTypeTooltip";
import { Link } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Box from "@/components/ui/Box";
import { TbUserShield } from "react-icons/tb";
import { BsArrowDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Edited from "@/components/ui/Edited";

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
  const role = useSelector((state: RootState) => state.role.value);

  const handleEdit = (item: ExpenseType) => {
    const formattedItem: ExpenseItemType = {
      ...item,
      employerId: item?.employerId?._id || null,
      type: item.type as PaymentType,
    };
    setSelectedExpense(formattedItem);
    setIsEditing(true);
    setOpenPopover(null);
  };

  return (
    <div className={`space-y-4 `}>
      {data?.map((item: ExpenseType, index: number) => (
        <Box key={item?._id || index}>
          <div className="flex items-center justify-between">
            <strong className="text-lg text-text font-semibold">
              {item?.amount?.toLocaleString()} UZS
            </strong>
            {role !== Role.EMPLOYEE && (
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
            )}
          </div>
          <div className="flex items-center gap-2 text-text-muted text-sm ">
            <MdOutlineAdminPanelSettings className="text-lg " />
            <span>
              {item?.adminId?.l_name}. {item?.adminId?.f_name}
            </span>
          </div>

          {item?.employerId && (
            <>
              <div className="size-4 flex justify-center text-text-muted ml-[1px]">
                <BsArrowDown className="" />
              </div>
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <TbUserShield className="text-lg " />
                <Link
                  className="hover:underline"
                  to={`/employees/user/${item?.employerId?._id}`}
                >
                  {item?.employerId?.l_name} {item?.employerId?.f_name}
                </Link>
              </div>
            </>
          )}

          {item?.comment && (
            <div className="text-text-muted text-sm  flex  gap-2 mt-1">
              <FaRegCommentDots className="text-lg min-w-4" />
              <span>{item?.comment}</span>
            </div>
          )}
          <div className="flex justify-between items-center mt-3 text-text-muted text-sm">
            <span>
              {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
            </span>
            <div className="flex items-center gap-4">
              <Edited createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
              <PaymentTypeTooltip type={item?.type} />
            </div>
          </div>
        </Box>
      ))}

      {isEditing && selectedExpense && (
        <ExpensePopup
          open={isEditing}
          onClose={() => setIsEditing(false)}
          employerId={selectedExpense?.employerId}
          name="Xarajatni tahrirlash"
          expense={selectedExpense}
        />
      )}
    </div>
  );
};

export default React.memo(ExpenseView);
