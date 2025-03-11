import React, { FC } from "react";
import { Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

interface Props {
  data: any;
}

const PaymentView: FC<Props> = ({ data }) => {
  console.log(data);

  return (
    <div className="my-4 space-y-4">
      <div className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300">
        <div className="flex items-center justify-between">
          <strong className="text-lg text-gray-900 font-semibold">
            60 000 UZS
          </strong>
          <Button type="text">
            <MoreOutlined />
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
          <span>11-Mart. 2025 06:05</span>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300">
        <div className="flex items-center justify-between">
          <strong className="text-lg text-gray-900 font-semibold">
            150 000 UZS
          </strong>
          <Button type="text">
            <MoreOutlined />
          </Button>
        </div>
        {/* <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur.
        </p> */}
        <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
          <span>11-Mart. 2025 06:05</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PaymentView);
