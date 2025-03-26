import CarsView from "@/components/cars-view/CarsView";
import { CustomEmpty, MiniLoading } from "@/utils";
import { Button, Pagination } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import CarPopup from "@/components/car-popup/CarPopup";
import { useOutletContext } from "react-router-dom";
import { useGetByCustomerIdQuery } from "../../../redux/api/car";
import { useParamsHook } from "../../../hooks/useParamsHook";

type ModalType = "payment" | "edit" | "car" | null;

interface ContextType {
  cars: any;
  customerId: string;
}

const CustomersCar = () => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const { customerId } = useOutletContext<ContextType>();
  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };
  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

  const { getParam, setParam } = useParamsHook();

  const page = parseInt(getParam("page") || "1", 10);
  const limit = 20;

  const filters = useMemo(
    () => ({
      page,
      limit,
    }),
    [page]
  );
  
  const { data, isError, isFetching } = useGetByCustomerIdQuery(
    {
      id:customerId,
      params: filters,
    },
    { skip: !customerId }
  );
  const cars = data?.data?.payload

  const totalItems = data?.data?.total || 0;  

  const handlePageChange = useCallback(
    (newPage: number) => {
      setParam("page", newPage.toString());
    },
    [setParam]
  );

  return (
    <>
      <div className="flex justify-between">
        <Title level={4}>Mijoz mashinalari</Title>
        <Button onClick={() => handleOpenModal("car")} type="primary">
          <PlusOutlined />
        </Button>
      </div>
      {cars?.length ? <CarsView data={cars} /> : <CustomEmpty />}
      <CarPopup
        open={modalType === "car"}
        onClose={handleClose}
        customerId={customerId}
      />
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

export default React.memo(CustomersCar);
