import React, { FC } from "react";
import { HistoryOutlined } from "@ant-design/icons";
import { Pagination, Button, DatePicker } from "antd";
import { PiBroom } from "react-icons/pi";
import { CustomEmpty, MiniLoading } from "@/utils";

const { RangePicker } = DatePicker;

interface Props {
  handleFilterChange: (dates: any) => void;
  clearFilters: () => void;
  handlePageChange: (newPage: number) => void;
  totalAmount: number;
  title: string;
  isError: boolean;
  isFetching: boolean;
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
  totalItems,
  limit,
  page,
  extraOptions,
  children,
}) => {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <HistoryOutlined />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-2 max-[600px]:order-3">
          <RangePicker
            popupClassName="custom-range-picker-dropdown"
            format="YYYY-MM-DD"
            onChange={handleFilterChange}
          />
          <Button type="default" onClick={clearFilters}>
            <PiBroom className="text-xl" />
          </Button>
          {extraOptions}
        </div>
        <div className="min-[600px]:w-full text-right max-[600px]:order-2">
          <h3 className="text-2xl font-bold">
            {isError ? "0" : totalAmount?.toLocaleString()} UZS
          </h3>
        </div>
      </div>
      {isError && <CustomEmpty />}
      {!isError && children}
      {isFetching && <MiniLoading />}
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
