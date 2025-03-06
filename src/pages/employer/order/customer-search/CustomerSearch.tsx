import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { ICustomer, IPayload } from "@/types";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { TbUserX } from "react-icons/tb";

interface ContextType {
  data: IPayload<ICustomer>;
  show: boolean;
}

const CustomerSearch = () => {
  const { data, show } = useOutletContext<ContextType>();
  return (
    show && (
      <div className="space-y-4 my-4">
        {data?.data?.payload?.map((customer: ICustomer) => (
          <div
            key={customer._id}
            className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
          >
            <div className="flex items-center gap-4 justify-between max-[500px]:flex-col max-[500px]:items-start ">
              <Link
                to={`/customer/${customer._id}`}
                className={`max-[500px]:w-full flex-1 flex items-center gap-2 text-base font-semibold  hover:underline `}
              >
                {customer.full_name === "Noma'lum" && <TbUserX className="text-2xl text-yellow-500"/>}
                {customer.full_name}
              </Link>
              <div className="flex max-[500px]:w-full max-[500px]:justify-end">
                <TelPopUp phoneNumber={customer.tel_primary} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default React.memo(CustomerSearch);
