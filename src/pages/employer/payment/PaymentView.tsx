import React, { FC, useState } from "react";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { FaRegCommentDots } from "react-icons/fa";
import { useCheckTokenQuery } from "@/redux/api/auth";
import { TbUser, TbUserShield } from "react-icons/tb";
import PaymentTypeTooltip from "../../../components/payment/PaymentTypeTooltip";
import PaymentPopup from "../../../components/payment-popup/PaymentPopup";
import Box from "../../../components/ui/Box";
import { BsArrowDown } from "react-icons/bs";

interface Props {
  data: any[];
}

const PaymentView: FC<Props> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const {
    data: { user },
  } = useCheckTokenQuery(undefined);

  const handleEdit = (item: any) => {
    setSelectedPayment(item);
    setIsEditing(true);
    setOpenPopover(null);
  };

  return (
    <div className="my-4 space-y-4">
      {data?.map((item, index) => {
        const createdAtDate = new Date(item?.createdAt);
        const currentDate = new Date(user?.time);
        const diffInHours =
          (currentDate.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60);

        const canEdit = user?.id === item?.employerId?._id && diffInHours <= 24;

        return (
          <Box key={item?._id || index}>
            <div className="flex items-center justify-between">
              <strong className="text-lg text-gray-900 font-semibold">
                {item?.amount?.toLocaleString()} UZS
              </strong>

              {canEdit && (
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

            <p className="flex items-center gap-2 text-gray-700 text-sm mt-1">
              <TbUser className="text-lg" />
              <span>{item?.customerId?.full_name}</span>
            </p>

            <div className="size-4 flex justify-center text-gray-500 ml-[1px]">
              <BsArrowDown />
            </div>

            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <TbUserShield className="text-lg" />
              <span>
                {item?.employerId?.l_name?.[0]}. {item?.employerId?.f_name}
              </span>
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

export default React.memo(PaymentView);
