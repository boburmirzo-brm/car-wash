import React, { FC } from "react";
import { HistoryOutlined } from "@ant-design/icons";
import { Pagination, Button, DatePicker, Skeleton } from "antd";
import { PiBroom } from "react-icons/pi";
import { CustomEmpty, MiniLoading } from "@/utils";
import Box from "./Box";

const { RangePicker } = DatePicker;

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
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <div className="text-xl font-bold flex items-center gap-2 text-text">
          <HistoryOutlined />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-2 max-[600px]:order-3">
          <RangePicker
            popupClassName="custom-range-picker-dropdown"
            format="YYYY-MM-DD"
            onChange={handleFilterChange}
          />
          {suffix === "ta" && extraOptions}
          <Button type="default" onClick={clearFilters}>
            <PiBroom className="text-xl" />
          </Button>
          {suffix !== "ta" && extraOptions}
        </div>
        <div className="min-[600px]:w-full text-right max-[600px]:order-2">
          <h3 className="text-2xl text-text font-bold">
            {isError ? "0" : totalAmount?.toLocaleString()} {suffix}
          </h3>
        </div>
      </div>
      {isError && <CustomEmpty />}
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
