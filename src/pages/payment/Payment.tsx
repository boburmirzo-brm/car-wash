import React, { FC, useState } from "react";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { FaRegCommentDots } from "react-icons/fa";
import { PaymentType, Role } from "@/constant";
import PaymentPopup from "@/components/payment-popup/PaymentPopup";
import PaymentTypeTooltip from "@/components/payment/PaymentTypeTooltip";
import { Link } from "react-router-dom";
import Box from "@/components/ui/Box";
import { TbUser, TbUserShield } from "react-icons/tb";
import { BsArrowDown } from "react-icons/bs";
import Edited from "@/components/ui/Edited";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { useCheckTokenQuery } from "@/redux/api/auth";

interface Props {
  data: any;
}

const Payment: FC<Props> = ({ data }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const role = useSelector((state: RootState) => state.role.value);
  const { data: profileData } = useCheckTokenQuery(undefined);

  const originalDate = profileData?.user?.time?.split(" ")[0];
  const date = new Date(originalDate);
  date.setDate(date.getDate() - 1);
  const tomorrowDate = date.toISOString().split("T")[0];

  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const handleEdit = (item: any) => {
    const formattedItem: any = {
      ...item,
      customerId: item.customerId._id || null,
      type: item.type as PaymentType,
    };
    setSelectedPayment(formattedItem);
    setIsEditing(true);
    setOpenPopover(null);
  };

  return (
    <div className={`space-y-4 `}>
      {data?.map((item: any, index: number) => {
        const date = item?.createdAt?.split(" ")[0];
        return (
          <Box key={item?._id || index}>
            <div className="flex items-center justify-between">
              <strong className="text-lg text-text font-semibold">
                {item?.amount?.toLocaleString()} UZS
              </strong>
              {(role !== Role.EMPLOYEE ||
                date === originalDate ||
                date === tomorrowDate) && (
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
            <div className="flex items-center gap-2  text-text-muted text-sm">
              <TbUser className="text-lg" />
              <Link
                className="hover:underline"
                to={`/customer/${item?.customerId?._id}`}
              >
                {item?.customerId?.full_name}
              </Link>
            </div>
            <div className="size-4 flex justify-center text-success ml-[1px]">
              <BsArrowDown className="" />
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <TbUserShield className="text-lg" />
              <Link
                className="hover:underline"
                to={`/employees/user/${item?.employerId?._id}`}
                title={
                  item?.employerId?.f_name + " " + item?.employerId?.l_name
                }
              >
                {item?.employerId?.l_name} {item?.employerId?.f_name}
              </Link>
            </div>

            {item?.comment && (
              <div className="text-text-muted text-sm  flex  gap-2">
                <FaRegCommentDots className="text-lg min-w-4" />
                <span>{item?.comment}</span>
              </div>
            )}
            <div className="flex justify-between items-center mt-3 text-text-muted text-sm">
              <span>
                {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
              </span>
              <div className="flex items-center gap-4">
                <Edited
                  createdAt={item?.createdAt}
                  updatedAt={item?.updatedAt}
                />
                <PaymentTypeTooltip type={item?.type} />
              </div>
            </div>
          </Box>
        );
      })}

      {isEditing && selectedPayment && (
        <PaymentPopup
          open={isEditing}
          onClose={() => setIsEditing(false)}
          customerId={selectedPayment.customerId}
          name="To'lovni tahrirlash"
          payment={selectedPayment}
        />
      )}
    </div>
  );
};

export default React.memo(Payment);
