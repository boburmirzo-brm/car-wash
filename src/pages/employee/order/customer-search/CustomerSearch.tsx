import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { ICustomer, IPayload } from "@/types";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { TbUserX } from "react-icons/tb";
import Box from "@/components/ui/Box";

interface ContextType {
  data: IPayload<ICustomer>;
  show: boolean;
}

const CustomerSearch = () => {
  const { data, show } = useOutletContext<ContextType>();
  return (
    show && (
      <>
        <h2 className="mt-4 text-text text-xl font-bold">Mijozlar</h2>
        <div className="space-y-4 my-4">
          {data?.data?.payload?.map((customer: ICustomer) => (
            <Box
              className="cursor-pointer "
              key={customer._id}
            >
              <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start ">
                <Link
                  to={`/customer/${customer._id}`}
                  className={`max-[500px]:w-full flex-1 flex items-center gap-2 text-base font-semibold  hover:underline `}
                >
                  {customer.full_name === "Noma'lum" && (
                    <TbUserX className="text-2xl text-yellow-500" />
                  )}
                  {customer.full_name}
                </Link>
                <div className="flex max-[500px]:w-full max-[500px]:justify-end">
                  <TelPopUp phoneNumber={customer.tel_primary} />
                </div>
              </div>
            </Box>
          ))}
        </div>
      </>
    )
  );
};

export default React.memo(CustomerSearch);
