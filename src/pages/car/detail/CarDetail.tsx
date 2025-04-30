import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "@/redux/api/car";
import { useGetSalaryByIdQuery } from "@/redux/api/salary";
import { useCheckTokenQuery } from "@/redux/api/auth";
import { Alert, Button, Skeleton, Tooltip } from "antd";
import { IoCarOutline, IoPlayOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import CarPopup from "@/components/car-popup/CarPopup";
import CarWashingPopup from "@/components/car-washing-popup/CarWashingPopup";
import CarNumber from "@/components/cars-view/CarNumber";
import CarsWashings from "./CarsWashings";
import Box from "@/components/ui/Box";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Role } from "@/constant";
import { useGetByCarIdQuery } from "@/redux/api/car-washing";
import { TbUser, TbUserShield } from "react-icons/tb";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";
import { BonusProgress } from "./BonusProgres";

type ModalType = "start" | "edit" | null;

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dataUser } = useCheckTokenQuery();
  const { isError } = useGetSalaryByIdQuery(dataUser?.user?.id, {
    skip: !dataUser?.user?.id,
  });

  const [modalType, setModalType] = useState<ModalType>(null);
  const role = useSelector((state: RootState) => state.role.value);

  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useGetCarByIdQuery({ id });
  const car = data?.data.payload?.car;

  const {
    data: carWashing,
    isFetching,
    isLoading: isLoadingWashing,
    isError: isErrorWashing,
  } = useGetByCarIdQuery(
    {
      id: car?._id,
      params: filters,
    },
    { skip: !car?._id }
  );
  const carWashings = carWashing?.data;

  const handleOpenModal = (type: ModalType) => setModalType(type);
  const handleClose = useCallback((isBack?: boolean) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

  return (
    <>
      <div
        className={`flex flex-col  ${role === Role.EMPLOYEE ? "my-4" : "p-4"}`}
      >
        {isError && role === Role.EMPLOYEE && (
          <Alert
            message="Oylik belgilanmagan. Avval oylikni belgilating"
            style={{ width: "100%" }}
            type="error"
          />
        )}

        <Box className="mb-4">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6">
              <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-3">
                <IoCarOutline className="text-7xl text-text-muted" />
                <div className="w-full">
                  <h3 className="text-2xl font-medium">{car?.name}</h3>
                  <Link
                    className="text-base text-text-muted hover:underline flex items-center gap-2"
                    to={`/customer/${car?.customerId._id}`}
                  >
                    <TbUser />
                    {car?.customerId.full_name}
                  </Link>
                  <p className="text-text-muted text-sm mt-3 flex items-center gap-2">
                    <TbUserShield className="text-lg" />
                    <span>
                      {car?.employerId?.l_name?.charAt(0)}.{" "}
                      {car?.employerId?.f_name}
                    </span>
                  </p>
                  <Tooltip
                    placement="bottom"
                    title={car?.createdAt.timeFormat()}
                  >
                    <span className="text-text-muted">
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
          {car &&
            data?.data.payload.freeCounter !== 0 ?(
              <div className="my-4">
                <BonusProgress
                  completedCountBonus={
                    data?.data.payload.completedCountBonus || 0
                  }
                  completedAmountBonus={
                    data?.data.payload.completedAmountBonus || 0
                  }
                  freeCounter={data?.data.payload.freeCounter || 5}
                  freeCounterAmount={
                    data?.data.payload.freeCounterAmount || 100000
                  }
                />
              </div>
            ) : <></>}
        </Box>

        <DateWithPagination
          clearFilters={clearFilters}
          handleFilterChange={handleFilterChange}
          handlePageChange={handlePageChange}
          totalAmount={carWashings?.totalAmount || 0}
          isError={isErrorWashing}
          isLoading={isLoadingWashing}
          isFetching={isFetching}
          totalItems={carWashings?.total || 0}
          limit={limit}
          page={page}
          title="Tarix"
        >
          <CarsWashings profile={true} data={carWashings?.payload} />
        </DateWithPagination>
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
