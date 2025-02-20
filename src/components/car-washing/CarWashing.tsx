import React from "react";
import Options from "./Options";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const CarWashing = () => {
  return (
    <div className="my-5">
      {data?.map((item) => (
        <div
          key={item}
          className="border-b border-slate-200 pb-2 mb-2 space-y-1"
        >
          <div className="flex gap-2 items-center justify-between">
            <h3 className="font-medium">Abduhalilov Muhammadumar</h3>
            <Options id={item} />
          </div>
          <div className="flex gap-2 items-center justify-between">
            <p>Chevrolet Trecker</p>
            <b className="border-2 border- inline-block text-sm px-2 rounded-[4px] uppercase">
              01 A 000 AA
            </b>
          </div>
          <div className="flex gap-2 justify-between">
            <div>
              <p className="text-primary">Samandar Hamraqulov</p>
              <span className="text-sm font-medium">60 000</span>
            </div>
            <strong className="">120 000</strong>
          </div>
          <p className="text-gray-500 text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="flex gap-2 justify-between items-end">
            <p className="text-sm text-gray-500">2-Fevral. 12:50</p>
            <a
              href="tel:+998 91 343 12 23"
              className="whitespace-nowrap flex-1 text-right underline text-green-600"
            >
              +998 91 343 12 23
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CarWashing);
