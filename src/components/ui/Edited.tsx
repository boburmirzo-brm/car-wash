import { Tooltip } from "antd";
import React, { FC } from "react";
import { FiEdit3 } from "react-icons/fi";

interface Props {
  createdAt: string;
  updatedAt: string;
}

const Edited: FC<Props> = ({ createdAt, updatedAt }) => {
  return (
    createdAt !== updatedAt && (
      <Tooltip
        placement="bottom"
        title={`O'zgartirilgan ${updatedAt?.dateFormat()} ${updatedAt?.timeFormat()}`}
      >
        <div>
          <FiEdit3 />
        </div>
      </Tooltip>
    )
  );
};

export default React.memo(Edited);
