import React, { FC, useState } from "react";
import { HistoryOutlined } from "@ant-design/icons";
import { Pagination, Button, DatePicker, Skeleton, Popover } from "antd";
import { PiBroom } from "react-icons/pi";
import { CustomEmpty, MiniLoading } from "@/utils";
import Box from "./Box";
import { useCheckTokenQuery } from "@/redux/api/auth";
import { fromToTime } from "@/helper";
import { useParamsHook } from "@/hooks/useParamsHook";
import { MoreOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

interface OptionsProps {
  handleFilterChange: (dates: any) => void;
}

const Options: React.FC<OptionsProps> = ({ handleFilterChange }) => {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex flex-col gap-1  min-w-[160px]">
      <RangePicker
        popupClassName="custom-range-picker-dropdown"
        format="YYYY-MM-DD"
        onChange={handleFilterChange}
      />
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottom"
      open={open}
      onOpenChange={setOpen}
    >
      <Button type="text">
        <MoreOutlined />
      </Button>
    </Popover>
  );
};

interface Props {
  handleFilterChange: (dates: any) => void;
  clearFilters: () => void;
  handlePageChange: (newPage: number) => void;
  totalAmount: number;
  title: string;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  suffix?: string;
  totalItems: number;
  limit: number;
  page: number;
  extraOptions?: React.ReactNode;
  children: React.ReactNode;
}

const DateWithPagination: FC<Props> = ({
  handleFilterChange,
  clearFilters,
  handlePageChange,
  title,
  totalAmount,
  isError,
  isFetching,
  isLoading,
  totalItems,
  limit,
  page,
  extraOptions,
  suffix = "UZS",
  children,
}) => {
  const { data: profile } = useCheckTokenQuery(undefined);
  const { getParam } = useParamsHook();
  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  console.log(fromDate); // 2025-04-06
  console.log(toDate); // 2025-04-13

  let betweenDay = 0;

  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = to.getTime() - from.getTime();
    betweenDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const hanleChange = (beforeDays: number) => {
    const { from, to } = fromToTime(profile?.user?.time || "", beforeDays);
    handleFilterChange([from, to]);
  };
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <div className="text-xl font-bold flex items-center gap-2 text-text">
          <HistoryOutlined />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-2 max-[600px]:order-3 flex-wrap">
          <Button
            disabled={betweenDay === 0}
            onClick={() => hanleChange(0)}
            type="default"
          >
            Bugun
          </Button>
          <Button
            disabled={betweenDay === 7}
            onClick={() => hanleChange(7)}
            type="default"
          >
            Hafta
          </Button>
          <Button
            disabled={betweenDay === 30}
            onClick={() => hanleChange(30)}
            type="default"
          >
            1 Oy
          </Button>
          <Options handleFilterChange={handleFilterChange} />
          {suffix !== "UZS" && extraOptions}
          <Button type="default" onClick={clearFilters}>
            <PiBroom className="text-xl" />
          </Button>
          {suffix === "UZS" && extraOptions}
        </div>
        <div className="min-[600px]:w-full text-right  max-[600px]:order-2 relative">
          <h3 className="text-2xl text-text font-bold mr-3">
            {isError ? "0" : totalAmount?.toLocaleString()} {suffix}
          </h3>
          {(!isError && suffix === "UZS") && (
            <span className="absolute -top-2.5 right-0 bg-primary block text-xs text-white  px-1 rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </div>
      {isError && <CustomEmpty />}
      {isFetching && !isLoading && <MiniLoading />}
      {!isError && children}
      {isLoading && (
        <Box>
          <Skeleton />
        </Box>
      )}
      {isFetching && !isLoading && <MiniLoading />}
      {!isError && totalItems > limit && (
        <div className="flex justify-end mt-4">
          <Pagination
            current={page}
            pageSize={limit}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(DateWithPagination);
