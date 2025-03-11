import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { useGetCustomerByIdQuery } from "@/redux/api/customer";
import { Button, Skeleton, Typography, Tooltip, Tabs } from "antd";
import React, { useCallback, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
// import { PlusOutlined } from "@ant-design/icons";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { TbUser, TbUserX } from "react-icons/tb";
// import CarsView from "@/components/cars-view/CarsView";
import PaymentPopup from "@/components/payment-popup/PaymentPopup";
import CustomerPopup from "@/components/customer-popup/CustomerPopup";
import CarPopup from "@/components/car-popup/CarPopup";
// import { CustomEmpty } from "@/utils";
import type { TabsProps } from "antd";

const { Title } = Typography;
type ModalType = "payment" | "edit" | "car" | null;

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isLoading } = useGetCustomerByIdQuery(id || "");
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

  const customer = data?.data.payload.customer;
  const cars = data?.data.payload.cars;

  const onChange = (key: string) => {
    navigate(key);
  };

  const activeTab =
    pathname.split("/").pop() === "payment-history" ? `payment-history` : ``;
  const items: TabsProps["items"] = [
    {
      key: ``,
      label: "Mashinalar",
      // children: "Content of Tab Pane 1",
    },
    {
      key: `payment-history`,
      label: "To'lov tarixi",
      // children: "Content of Tab Pane 2",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 my-4">
        <div className="shadow-md md:p-6 p-4 rounded-md border border-gray-100 w-full">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
              <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-3">
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
                  <p className="text-gray-600 mt-3">
                    Ro'yhatdan o'tkazgan{" "}
                    <span className="text-black">
                      {customer?.employerId?.l_name?.charAt(0)}.{" "}
                      {customer?.employerId?.f_name}
                    </span>
                  </p>
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
                  type={
                    customer?.budget === 0
                      ? "secondary"
                      : (customer?.budget || 0) > 0
                      ? "success"
                      : "danger"
                  }
                  style={{ marginBottom: 0 }}
                >
                  {(customer?.budget || 0)?.toLocaleString() || "0"} UZS
                </Title>
                <TelPopUp phoneNumber={customer?.tel_primary || ""} />
                <div className="flex gap-1.5">
                  <Button
                    onClick={() => handleOpenModal("edit")}
                    type="default"
                  >
                    <FaRegEdit className="text-lg" />
                  </Button>
                  <Button
                    onClick={() => handleOpenModal("payment")}
                    type="default"
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
          <Tabs
            defaultActiveKey={activeTab}
            activeKey={activeTab}
            items={items}
            onChange={onChange}
          />
          <Outlet context={{ cars, customerId: customer?._id }} />
          {/* <div className="flex justify-between">
            <Title level={4}>Mijoz mashinalari</Title>
            <Button
              onClick={() => handleOpenModal("car")}
              loading={isLoading}
              type="primary"
            >
              <PlusOutlined />
            </Button>
          </div>
          {isLoading ? (
            <Skeleton active />
          ) : cars?.length ? (
            <CarsView data={cars || []} />
          ) : (
            <CustomEmpty />
          )} */}
        </div>
      </div>
      <PaymentPopup
        open={modalType === "payment"}
        onClose={handleClose}
        customerId={customer?._id || ""}
        name={customer?.full_name || ""}
        onlyPayment={true}
      />
      <CustomerPopup
        open={modalType === "edit"}
        onClose={handleClose}
        prevData={{
          full_name: customer?.full_name || "",
          tel_primary: customer?.tel_primary?.slice(4) || "",
          id: customer?._id || "",
        }}
      />

      <CarPopup
        open={modalType === "car"}
        onClose={handleClose}
        customerId={customer?._id}
      />
    </>
  );
};

export default React.memo(CustomerDetail);
