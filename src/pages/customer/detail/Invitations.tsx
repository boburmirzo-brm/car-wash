import { useGetCustomerInvitationsQuery } from "@/redux/api/invitation";
import { Button, Tooltip } from "antd";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string | undefined;
  filters: any;
}

const Invitations: FC<Props> = ({ id }) => {
  const [showMore, setShowMore] = useState(false);
  const filters = { limit: 1000 };
  const { data, error } = useGetCustomerInvitationsQuery({ id, filters });

  const invitations = data?.data?.payload;

  if (error) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between mb-2 ${
          showMore ? "pt-4" : ""
        }`}
      >
        <h3 className="text-text-muted font-bold">Taklif qilinganlar :</h3>
        {showMore && (
          <Button type="primary" onClick={() => setShowMore(false)}>
            Ko'rinmasin
          </Button>
        )}
      </div>

      {!showMore ? (
        <div className="flex">
          <div className="flex pl-3" onClick={() => setShowMore(true)}>
            {invitations?.slice(0, 3)?.map((item: any) => (
              <Tooltip
                key={item._id}
                title={`${item?.fromId?.full_name} - ${item.percent}%`}
                placement="bottom"
              >
                <div className="flex items-center justify-center shadow cursor-pointer bg-gray-200 -ml-3 gap-2 size-9 rounded-full border-4 border-gray-400  dark:border-gray-600 dark:bg-gray-700">
                  <span className="text-gray-400 font-semibold">
                    {item?.fromId?.full_name[0]}
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="grid max-md:hidden grid-cols-4 font-bold gap-2 py-1.5 text-text-muted dark:border-gray-700">
            <span>Ismi</span>
            <span>Foiz</span>
            <span>Ro'yhatga olgan hodim</span>
            <span className="text-right">Vaqti</span>
          </div>

          {invitations?.map((item: any) => {
            const isInvalid = item?.valid === false;
            return (
              <div
                key={item._id}
                className={`grid grid-cols-2 md:grid-cols-4 gap-2 py-1.5 cursor-pointer border-t border-gray-200 dark:border-gray-700 ${
                  isInvalid ? "bg-red-50 dark:bg-red-900/20" : ""
                }`}
              >
                <Tooltip
                  title={
                    isInvalid
                      ? `Bu taklif ishlatilingan - ${item.updatedAt.dateFormat()} ${item.updatedAt.timeFormat()}`
                      : ""
                  }
                  placement="topLeft"
                >
                  <div className="flex items-center gap-2 text-nowrap line-clamp-1">
                    <Link
                      to={`/customer/${item?.fromId?._id}`}
                      className={`font-bold ${
                        isInvalid
                          ? "text-red-500 opacity-70 italic"
                          : "text-text"
                      }`}
                    >
                      {item?.fromId?.full_name}
                    </Link>
                    {isInvalid && (
                      <span className="text-xs text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-300 px-2 py-0.5 rounded">
                        Ishlatilingan
                      </span>
                    )}
                  </div>
                </Tooltip>

                <span className="max-md:text-right text-text-muted">
                  {item.percent}%
                </span>
                <span className="text-nowrap line-clamp-1 text-text-muted">
                  {item?.employerId?.f_name} {item?.employerId?.l_name}
                </span>
                <span className="text-right max-md:text-sm text-text-muted">
                  {item?.createdAt?.dateFormat()}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(Invitations);
