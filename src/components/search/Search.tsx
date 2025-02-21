import React from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FiPhone } from "react-icons/fi";
import { Segmented } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import "./style.css"

const Search = () => {

  return (
    <div>
      <div className="flex gap-2">
        <Input value={"Abduhalilov"} autoFocus placeholder="Qidirish..." />
        <Button type="primary">
          <PlusOutlined />
        </Button>
      </div>
      <div className="mt-4">
        <Segmented<string>
          options={[
            {value: 'customer', icon: <AiOutlineUser size={18}/>, label: "Mijoz", className: "flex items-center justify-center search-bar"},
            {value: 'car', icon: <IoCarOutline size={18}/>, label: "Mashina", className: "flex items-center justify-center search-bar"},
          ]}
          onChange={(value) => {
            console.log(value); 
          }}
          block
        //   value="car"
        />
      </div>
      <div className="space-y-4 my-4">
        {[1, 2, 3, 4, 5]?.map((item) => (
          <div
            key={item}
            className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
          >
            <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-4">
              <h3 className="text-base font-semibold text-gray-800">
                Abduhalilov Muhammadumar
              </h3>
              <a
                href="tel:+998913431223"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
              >
                <span>+998 91 343 12 23</span>
                <FiPhone className="text-lg" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Search);
