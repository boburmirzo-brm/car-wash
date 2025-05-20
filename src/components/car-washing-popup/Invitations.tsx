import { useGetCustomerInvitationsQuery } from "@/redux/api/invitation";
import { Button } from "antd";
import React, { FC } from "react";

interface Props {
  id: string;
  select: (p: any) => void;
  item: any;
  amount: any;
}

const Invitations: FC<Props> = ({ id, select, item, amount }) => {
  const filters = { isValid: true, limit: 1000 };
  
  const { data, error } = useGetCustomerInvitationsQuery({ id, filters });

  const invitations = data?.data?.payload;

  if (error) return null;
  return (
    <div className="mb-4">
      {item ? (
        <div>
          <div className="flex justify-between gap-4">
            <p onClick={() => select(item)}>
              <span className="font-bold">{item?.fromId?.full_name}</span>{" "}
              do'stingizni taklif qilganingiz sababli{" "}
              <span className=" font-semibold text-green-600">
                {(amount * (item?.percent / 100)).toLocaleString()} so'm
              </span>{" "}
              chegirma berildi
            </p>
            <Button type="default" onClick={() => select(null)}>
              Bekor qilish
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-gray-500 font-semibold text-sm">Taklif :</div>
          <div className="flex pl-3">
            <button
              disabled={Boolean(!amount)}
              onClick={() => select(invitations[0])}
              className="disabled:opacity-50 disabled:cursor-default relative flex items-center justify-center shadow cursor-pointer bg-gray-200 -ml-3 gap-2 size-9 rounded-full border-4 border-gray-400 dark:border-gray-600 dark:bg-gray-700"
            >
              <span className="text-gray-400 font-semibold">
                {invitations && invitations[0]?.fromId?.full_name[0]}
              </span>
              <span className=" font-semibold absolute -top-1 -right-5 bg-green-500 text-white rounded-full px-1 text-xs dark:bg-green-600">
                {invitations && invitations[0]?.percent}%
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Invitations);
