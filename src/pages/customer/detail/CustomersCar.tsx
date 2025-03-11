import CarsView from "@/components/cars-view/CarsView";
import { CustomEmpty } from "@/utils";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import CarPopup from "@/components/car-popup/CarPopup";
import { useOutletContext } from "react-router-dom";

type ModalType = "payment" | "edit" | "car" | null;

interface ContextType {
  cars: any;
  customerId: string;
}

const CustomersCar = () => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const { customerId, cars } = useOutletContext<ContextType>();

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };
  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <Title level={4}>Mijoz mashinalari</Title>
        <Button onClick={() => handleOpenModal("car")} type="primary">
          <PlusOutlined />
        </Button>
      </div>
      {cars?.length ? <CarsView data={cars || []} /> : <CustomEmpty />}
      <CarPopup
        open={modalType === "car"}
        onClose={handleClose}
        customerId={customerId}
      />
    </>
  );
};

export default React.memo(CustomersCar);
