import React, { useState, useCallback, useMemo } from "react";
import { TbCoins, TbUserX } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { MoreOutlined } from "@ant-design/icons";
import { HistoryOutlined } from "@ant-design/icons";
import { Popover, Button, DatePicker, Space } from "antd";
import { Role } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Link } from "react-router-dom";
import { useGetMyWashingsQuery } from "../../redux/api/car-washing";
import { ICarWash } from "../../types";

const { RangePicker } = DatePicker;

const CarWashingHistory = () => {
  const role = useSelector((state: RootState) => state.role?.value);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    fromDate: "",
    toDate: "",
    done: "1",
  });
  const [filters, setFilters] = useState(tempFilters);

  const { data } = useGetMyWashingsQuery(filters);

  const handleTempFilterChange = useCallback(
    (key: string, value: string | undefined) => {
      setTempFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyFilters = useCallback(() => {
    setFilters(tempFilters);
    setPopoverOpen(false);
  }, [tempFilters]);

  const popoverContent = useMemo(
    () => (
      <div className="p-3 w-64 space-y-3">
        <Space direction="vertical" className="w-full">
          <span className="font-semibold">Sana oralig'i:</span>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={(dates) => {
              handleTempFilterChange(
                "fromDate",
                dates?.[0]?.format("YYYY-MM-DD")
              );
              handleTempFilterChange(
                "toDate",
                dates?.[1]?.format("YYYY-MM-DD")
              );
            }}
          />
        </Space>
        <Button type="primary" block onClick={applyFilters}>
          Qidirish
        </Button>
      </div>
    ),
    [handleTempFilterChange, applyFilters]
  );

  return (
    <div className="my-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <HistoryOutlined /> Tarix
        </h2>
        <Popover
          content={popoverContent}
          title=""
          trigger="click"
          placement="bottomRight"
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
        >
          <Button type="text">
            <MoreOutlined />
          </Button>
        </Popover>
      </div>
      {data?.data?.payload?.map((item: ICarWash) => (
        <div
          key={item._id}
          className="bg-white shadow-sm rounded-md p-4 border border-gray-300 relative"
        >
          <div className="flex items-center justify-between mt-2">
            <Link
              to={`/car/${item?.carId?._id}`}
              className="flex items-center gap-2 text-gray-700"
            >
              <IoCarOutline className="text-lg text-gray-600" />
              <span>{item?.carId?.name}</span>
            </Link>
            <span className="border-2 font-bold border-gray-500 px-2 py-1 rounded-md uppercase text-gray-700 text-base">
              {item?.carId?.plateNumber?.plateNumberFormat()}
            </span>
          </div>

          {role === Role.EMPLOYEE && (
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-3">
              <div>
                <p className="flex items-center gap-2 text-gray-700 text-sm">
                  <AiOutlineUser className="text-lg" />
                  <Link
                    to={`/customer/${item?.customerId?._id}`}
                    className="text-base font-semibold text-gray-800 flex items-center gap-2"
                  >
                    {item?.customerId?.full_name === "Noma'lum" && (
                      <TbUserX className="text-2xl text-yellow-500" />
                    )}
                    {item?.customerId?.full_name || "Noma'lum mijoz"}
                  </Link>
                </p>
                <p className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  <TbCoins className="text-lg" />
                  <span>
                    {item?.employerSalary?.toLocaleString() || "0"} UZS
                  </span>
                </p>
              </div>
              <strong className="text-lg text-gray-900 font-semibold">
                {item?.washAmount?.toLocaleString() || "0"} UZS
              </strong>
            </div>
          )}
          <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
            <span>
              {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
            </span>
          </div>
        </div>
        
      ))}
    </div>
  );
};

export default React.memo(CarWashingHistory);
