import React, { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "@/redux/api/car";
import { useGetSalaryByIdQuery } from "@/redux/api/salary";
import { useCheckTokenQuery } from "@/redux/api/auth";
import { useParamsHook } from "../../../hooks/useParamsHook";
import { Alert, Button, Pagination, Skeleton, Tooltip, DatePicker } from "antd";
import { IoCarOutline, IoPlayOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { HistoryOutlined } from "@ant-design/icons";
import CarPopup from "@/components/car-popup/CarPopup";
import CarWashingPopup from "@/components/car-washing-popup/CarWashingPopup";
import CarNumber from "@/components/cars-view/CarNumber";
import CarsWashings from "./CarsWashings";
import { CustomEmpty } from "@/utils";
import Box from "@/components/ui/Box";
import { PiBroom } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Role } from "@/constant";
import { useGetByCarIdQuery } from "../../../redux/api/car-washing";

const { RangePicker } = DatePicker;
type ModalType = "start" | "edit" | null;

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dataUser } = useCheckTokenQuery();
  const { isError } = useGetSalaryByIdQuery(dataUser?.user?.id, {
    skip: !dataUser?.user?.id,
  });

  const [modalType, setModalType] = useState<ModalType>(null);
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();
  const role = useSelector((state: RootState) => state.role.value);

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  const page = parseInt(getParam("page") || "1", 10);
  const limit = 20;

  const filters = useMemo(
    () => ({ fromDate, toDate, page, limit }),
    [fromDate, toDate, page]
  );

  const { data, isLoading } = useGetCarByIdQuery({ id, params: filters });
  const car = data?.data.payload?.car;

  const { data: carWashing } = useGetByCarIdQuery({
    id: car?._id,
    params: filters,
  },
    { skip: !car?._id }
  );
  const carWashings = carWashing?.data.payload;
  const totalItems = data?.data.total;

  const handleOpenModal = (type: ModalType) => setModalType(type);
  const handleClose = useCallback((isBack?: boolean) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

  const handleFilterChange = useCallback(
    (dates: any) => {
      if (dates) {
        setParam("fromDate", dates[0].format("YYYY-MM-DD"));
        setParam("toDate", dates[1].format("YYYY-MM-DD"));
      } else {
        removeParam("fromDate");
        removeParam("toDate");
      }
    },
    [setParam, removeParam]
  );

  const clearFilters = useCallback(() => {
    removeParams(["fromDate", "toDate", "page"]);
  }, [removeParams]);

  const handlePageChange = useCallback(
    (newPage: number) => setParam("page", newPage.toString()),
    [setParam]
  );

  return (
    <>
      <div
        className={`flex flex-col gap-4  ${
          role === Role.EMPLOYEE ? "my-4" : "p-4"
        }`}
      >
        {isError && role === Role.EMPLOYEE && (
          <Alert
            message="Oylik belgilanmagan. Avval oylikni belgilating"
            style={{ width: "100%" }}
            type="error"
          />
        )}

        <Box>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6">
              <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-3">
                <IoCarOutline className="text-7xl text-gray-600" />
                <div className="w-full">
                  <h3 className="text-2xl font-medium">{car?.name}</h3>
                  <Link
                    className="text-base text-gray-800 hover:underline"
                    to={`/customer/${car?.customerId._id}`}
                  >
                    {car?.customerId.full_name}
                  </Link>
                  <p className="text-gray-600 text-sm mt-3">
                    Ro'yhatdan o'tkazgan
                    <span className="text-black">
                      {car?.employerId?.l_name?.charAt(0)}.{" "}
                      {car?.employerId?.f_name}
                    </span>
                  </p>
                  <Tooltip
                    placement="bottom"
                    title={car?.createdAt.timeFormat()}
                  >
                    <span className="text-gray-600">
                      {car?.createdAt.dateFormat()}
                    </span>
                  </Tooltip>
                </div>
              </div>
              <div className="flex w-full flex-col items-end gap-3">
                <CarNumber plateNumber={car?.plateNumber} />
                <div className="flex gap-1.5">
                  <Button
                    onClick={() => handleOpenModal("edit")}
                    type="default"
                  >
                    <FaRegEdit className="text-lg" />
                  </Button>
                  <Button
                    onClick={() => handleOpenModal("start")}
                    type="primary"
                    disabled={isError || car?.isWashing}
                  >
                    <IoPlayOutline className="text-lg" />
                    <span>Start</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Box>

        <Box>
          <div className="flex justify-between items-start max-[600px]:gap-4 max-[600px]:flex-col">
            <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
              <HistoryOutlined />
              <span>Tarix</span>
            </div>
            <div className="flex gap-2">
              <RangePicker
                popupClassName="custom-range-picker-dropdown"
                format="YYYY-MM-DD"
                onChange={handleFilterChange}
              />
              <Button type="default" onClick={clearFilters}>
                <PiBroom className="text-xl" />
              </Button>
            </div>
          </div>
          {!carWashings?.length && <CustomEmpty />}
          <CarsWashings profile={true} data={carWashings} />
          <div className="flex justify-end mt-4">
            <Pagination
              current={page}
              pageSize={limit}
              total={totalItems}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </Box>
      </div>

      <CarPopup
        open={modalType === "edit"}
        onClose={handleClose}
        prevData={{
          name: car?.name || "",
          plateNumber: car?.plateNumber || "",
          id: car?._id || "",
        }}
      />
      <CarWashingPopup
        open={modalType === "start"}
        onClose={handleClose}
        customerId={car?.customerId._id}
        carId={car?._id}
      />
    </>
  );
};

export default React.memo(CarDetail);
