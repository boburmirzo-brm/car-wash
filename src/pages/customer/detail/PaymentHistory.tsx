import PaymentView from "@/components/payment/PaymentView";
import { useGetPaymentByCustomerIdQuery } from "@/redux/api/payment";
import React from "react";
import { useOutletContext } from "react-router-dom";

interface ContextType {
  cars: any;
  customerId: string;
}
const PaymentHistory = () => {
  const { customerId } = useOutletContext<ContextType>();
  const {data} = useGetPaymentByCustomerIdQuery({})
  console.log(customerId);

  console.log(data);
  

  return <div>
    <PaymentView data={data?.data.payload}/>
  </div>;
};

export default React.memo(PaymentHistory);
