import React, { FC, useState } from "react";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { FaRegCommentDots } from "react-icons/fa";
import { PaymentType } from "@/constant";
import PaymentPopup from "@/components/payment-popup/PaymentPopup";
import PaymentTypeTooltip from "@/components/payment/PaymentTypeTooltip";
import { Link } from "react-router-dom";
import Box from "@/components/ui/Box";
import { TbUser, TbUserShield } from "react-icons/tb";
import { BsArrowDown } from "react-icons/bs";

interface Props {
  data: any;
}

const Payment: FC<Props> = ({ data }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  
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
      {data?.map((item: any, index: number) => (
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
          <div className="flex items-center gap-2  text-gray-700 text-sm">
            <TbUser className="text-lg" />
            <Link
              className="hover:underline"
              to={`/customer/${item?.customerId?._id}`}
            >
              {item?.customerId?.full_name}
            </Link>
          </div>
          <div className="size-4 flex justify-center text-green-500 ml-[1px]">
            <BsArrowDown className=""/> 
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <TbUserShield className="text-lg" />
            <Link
              className="hover:underline"
              to={`/employees/user/${item?.employerId?._id}`}
              title={item?.employerId?.f_name + " " + item?.employerId?.l_name}
            >
              {item?.employerId?.l_name[0]}. {item?.employerId?.f_name}
            </Link>
          </div>

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
