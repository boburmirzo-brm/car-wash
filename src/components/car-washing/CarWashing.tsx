import React, { FC } from "react";
import Options from "./Options";
import { FiPhone } from "react-icons/fi";
import { TbCoins } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";

const data = Array.from({ length: 15 }, (_, i) => i + 1);

interface Props {
  role: string;
}

const CarWashing: FC<Props> = ({ role }) => {
  return (
    <div className="my-5 space-y-4">
      {data.map((item) => (
        <div
          key={item}
          className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-800">
              Abduhalilov Muhammadumar
            </h3>
            <Options id={item} />
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <IoCarOutline className="text-lg text-gray-600" />
              <span>Chevrolet Trecker</span>
            </p>
            <b className="border border-gray-500 px-2 py-1 rounded-md text-xs uppercase text-gray-700">
              01 A 000 AA
            </b>
          </div>

          {role === "admin" && (
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-3">
              <div>
                <p className="flex items-center gap-2 text-gray-700 text-sm">
                  <AiOutlineUser className="text-lg" />
                  <span>Samandar Hamraqulov</span>
                </p>
                <p className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  <TbCoins className="text-lg" />
                  <span>60 000 UZS</span>
                </p>
              </div>
              <strong className="text-lg text-gray-900 font-semibold">
                120 000 UZS
              </strong>
            </div>
          )}

          <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
            <span>2-Fevral, 12:50</span>
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
  );
};

export default React.memo(CarWashing);
