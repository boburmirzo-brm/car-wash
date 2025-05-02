import React, { FC, useCallback, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import "./style.css";
import CustomerPopup from "../customer-popup/CustomerPopup";
import { useLocation, useNavigate } from "react-router-dom";
import { useParamsHook } from "@/hooks/useParamsHook";
import SearchWrapper from "./SearchWrapper";

interface Props {
  hideBottom?: boolean;
}

const Search: FC<Props> = ({ hideBottom = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { removeParam } = useParamsHook();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentPathname = pathname.endsWith("/customer") ? "customer" : "";

  const handleOpen = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsModalOpen(false);
    if (!isBack) window.history.back();
  }, []);

  const handleChange = (value: string) => {
    removeParam("q");
    navigate(`/employee/order/${value}`);
  };

  return (
    <div>
      <div className="flex gap-2">
        <SearchWrapper />
        <Button type="primary" onClick={handleOpen}>
          <PlusOutlined />
        </Button>
      </div>
      {!hideBottom && (
        <div className="mt-4">
          <Segmented<string>
            options={[
              {
                value: "",
                icon: <IoCarOutline size={18} />,
                label: "Mashina",
                className: "flex items-center justify-center search-bar",
              },
              {
                value: "customer",
                icon: <AiOutlineUser size={18} />,
                label: "Mijoz",
                className: "flex items-center justify-center search-bar",
              },
            ]}
            onChange={(value) => handleChange(value)}
            block
            value={currentPathname}
          />
        </div>
      )}

      <CustomerPopup
        open={isModalOpen}
        onClose={handleClose}
        invitation={true}
      />
    </div>
  );
};

export default React.memo(Search);
