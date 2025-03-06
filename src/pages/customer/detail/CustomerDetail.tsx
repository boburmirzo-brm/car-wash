import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { useGetCustomerByIdQuery } from "@/redux/api/customer";
import { Button, Empty, Skeleton, Typography, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { TbUser, TbUserX } from "react-icons/tb";
import CarsView from "@/components/cars-view/CarsView";
import PaymentPopup from "@/components/payment-popup/PaymentPopup";
import CustomerPopup from "@/components/customer-popup/CustomerPopup";

const { Title } = Typography;
type ModalType = "payment" | "edit" | null;

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCustomerByIdQuery(id || "");
  const [modalType, setModalType] = useState<ModalType>(null);

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      if (modalType) {
        event.preventDefault();
        setModalType(null);
      }
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [modalType]);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
    window.history.pushState(null, "", window.location.pathname); 
  };

  const handleClose = useCallback(() => {
    setModalType(null);
    window.history.back();
  }, []);

  const customer = data?.data.payload.customer;
  const cars = data?.data.payload.cars;

  return (
    <>
      <div className="flex flex-col gap-4 my-4">
        <div className="shadow-md md:p-6 p-4 rounded-md border border-gray-100 w-full">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
              <div className="flex items-center  w-full  flex-row gap-3">
                <div>
                  {customer?.full_name === "Noma'lum" ? (
                    <TbUserX className="text-7xl text-yellow-500" />
                  ) : (
                    <TbUser className="text-7xl text-gray-600" />
                  )}
                </div>
                <div className="w-full ">
                  <h3 className="text-2xl font-medium">
                    {customer?.full_name}
                  </h3>
                  <Tooltip
                    placement="bottom"
                    title={customer?.createdAt.timeFormat()}
                  >
                    <span className="text-gray-600">
                      {customer?.createdAt.dateFormat()}
                    </span>
                  </Tooltip>
                </div>
              </div>

              <div className="flex w-full flex-col items-end gap-1.5">
                <Title
                  level={3}
                  type={(customer?.budget || 0) >= 0 ? "success" : "danger"}
                  style={{ marginBottom: 0 }}
                >
                  {(customer?.budget || 0)?.toLocaleString() || "0"} UZS
                </Title>
                <TelPopUp phoneNumber={customer?.tel_primary || ""} />
                <div className="flex gap-1.5">
                  <Button
                    onClick={() => handleOpenModal("edit")}
                    type="primary"
                  >
                    <FaRegEdit className="text-lg" />
                    <span>Tahrirlash</span>
                  </Button>
                  <Button
                    onClick={() => handleOpenModal("payment")}
                    type="primary"
                  >
                    <MdAttachMoney className="text-lg" />
                    <span>To'lov</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="shadow-md md:p-6 p-4 rounded-md border border-gray-100 w-full">
          <div className="flex justify-between">
            <Title level={4}>Mijoz mashinalari</Title>
            <Button type="primary">
              <PlusOutlined />
            </Button>
          </div>
          {cars?.length ? (
            <CarsView data={cars || []} />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
      <PaymentPopup
        open={modalType === "payment"}
        onClose={handleClose}
        id={customer?._id || ""}
        name={customer?.full_name || ""}
        onlyPayment={true}
        // prevData={{price: 5000, amount: 60000, _id: "asdsadsad"}}
      />
      <CustomerPopup
        open={modalType === "edit"}
        onClose={handleClose}
        customer={{
          full_name: customer?.full_name || "",
          tel_primary: customer?.tel_primary || "",
          id: customer?._id || "",
        }}
      />
    </>
  );
};

export default React.memo(CustomerDetail);
