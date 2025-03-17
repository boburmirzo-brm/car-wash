import { Tooltip } from "antd";
import React from "react";
import { FaMoneyBillWave, FaRegCreditCard } from "react-icons/fa";
import { PaymentType } from "@/constant";

const PaymentTypeTooltip = ({ type }: { type: string }) => {
  return type === PaymentType.CASH ? (
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
  );
};

export default React.memo(PaymentTypeTooltip);
