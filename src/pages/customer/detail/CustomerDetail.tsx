import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { useGetCustomerByIdQuery } from "@/redux/api/customer";
import { Button, Skeleton, Typography, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { useParams, Outlet } from "react-router-dom";
import { TbUser, TbUserShield, TbUserX } from "react-icons/tb";
import PaymentPopup from "@/components/payment-popup/PaymentPopup";
import CustomerPopup from "@/components/customer-popup/CustomerPopup";
import CarPopup from "@/components/car-popup/CarPopup";
import Box from "@/components/ui/Box";
import { Role } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Tabs from "@/components/ui/Tabs";

const { Title } = Typography;
type ModalType = "payment" | "edit" | "car" | null;

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCustomerByIdQuery(id || "");
  const [modalType, setModalType] = useState<ModalType>(null);
  const role = useSelector((state: RootState) => state.role.value);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

  const customer = data?.data.payload.customer;
  const cars = data?.data.payload.cars;

  return (
    <>
      <div
        className={`flex flex-col   ${role === Role.EMPLOYEE ? "my-4" : "p-4"}`}
      >
        <Box>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
              <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-3">
                <div>
                  {customer?.full_name === "Noma'lum" ? (
                    <TbUserX className="text-7xl text-yellow-500" />
                  ) : (
                    <TbUser className="text-7xl text-text-muted" />
                  )}
                </div>
                <div className="w-full ">
                  <h3 className="text-2xl font-medium">
                    {customer?.full_name}
                  </h3>
                  <p className="text-text-muted mt-3 flex items-center gap-2">
                    <TbUserShield className="text-lg" />
                    <span className="">
                      {customer?.employerId?.l_name?.charAt(0)}.{" "}
                      {customer?.employerId?.f_name}
                    </span>
                  </p>
                  <Tooltip
                    placement="bottom"
                    title={customer?.createdAt.timeFormat()}
                  >
                    <span className="text-text-muted">
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
        </Box>
        <Tabs
          className="mt-4"
          items={[
            { title: "Mashinalar", path: "", id: 0 },
            { title: "To'lov tarixi", path: "payment-history", id: 1 },
          ]}
        />
        <div className="mt-4 min-h-[500px]">
          <Outlet context={{ cars, customerId: customer?._id }} />
        </div>
      </div>
      <PaymentPopup
        open={modalType === "payment"}
        onClose={handleClose}
        customerId={customer?._id || ""}
        name={customer?.full_name || ""}
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
