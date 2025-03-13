import React, { FC, useState } from "react";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import PaymentPopup from "../payment-popup/PaymentPopup";

interface Props {
  data: any[];
}

const PaymentView: FC<Props> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const handleEdit = (item: any) => {
    setSelectedPayment(item);
    setIsEditing(true);
    setOpenPopover(null);
  };

  return (
    <div className="my-4 space-y-4">
      {data?.map((item, index) => (
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
          <p className="text-sm text-gray-600">{item?.comment}</p>
          <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
            <span>
              {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
            </span>
          </div>
        </div>
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

export default React.memo(PaymentView);
