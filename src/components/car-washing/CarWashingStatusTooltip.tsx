import { CarWashingStatus } from "@/constant";
import { Tooltip } from "antd";
import React from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import { TbCancel } from "react-icons/tb";

const CarWashingStatusTooltip = ({ status }: { status: string }) => {
  return status === CarWashingStatus.PENDING ? (
    <Tooltip placement="bottom" title="Yuvilmoqda">
      <div>
        <MdOutlinePending className="text-xl text-yellow-500" />
      </div>
    </Tooltip>
  ) : status === CarWashingStatus.COMPLETED ? (
    <Tooltip placement="bottom" title="Muvaffaqiyatli yuvilgan">
      <div>
        <IoMdDoneAll className="text-green-700" />
      </div>
    </Tooltip>
  ) : (
    <Tooltip placement="bottom" title="Bekor qilingan">
      <div>
        <TbCancel className="text-xl text-red-500" />
      </div>
    </Tooltip>
  );
};

export default React.memo(CarWashingStatusTooltip);
