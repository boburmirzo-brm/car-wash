import { Tooltip } from "antd";
import React from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { PaymentType } from "@/constant";
import { PiMoneyWavy } from "react-icons/pi";

const PaymentTypeTooltip = ({ type }: { type: string }) => {
  return type === PaymentType.CASH ? (
    <Tooltip placement="bottom" title="Naqd">
      <div>
        <PiMoneyWavy className="text-xl" />
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
