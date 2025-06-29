import React, { FC } from "react";
import { TbCoins } from "react-icons/tb";
import { CarWashingStatus, Role } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { TbUserShield } from "react-icons/tb";
import CarWashingStatusTooltip from "@/components/car-washing/CarWashingStatusTooltip";
import Box from "@/components/ui/Box";
import { Link } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { FiTag } from "react-icons/fi";

interface Props {
  data: any;
  profile?: boolean;
}

const CarsWashings: FC<Props> = ({ data, profile }) => {
  const role = useSelector((state: RootState) => state.role.value);

  return (
    <div className="space-y-4">
      {data?.map((item: any) => {
        const washAmount = item?.washAmount || 0;

        const discountPercent = item?.invitationId?.percent || 0;
        const discount = item?.invitationId
          ? (washAmount * discountPercent) / 100
          : 0;
        const discountedAmount = washAmount - discount;

        return (
          <Box key={item._id}>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <TbUserShield className="text-xl" />
                <Link
                  to={`/employees/user/${item?.employerId?._id}`}
                  className="hover:underline"
                >
                  {item?.employerId?.f_name} {item?.employerId?.l_name}
                </Link>
              </div>
              <CarWashingStatusTooltip status={item?.status} />
            </div>

            {(role === Role.ADMIN || role === Role.OWNER || profile) &&
              !(
                item?.status === CarWashingStatus.CANCELED ||
                item?.status === CarWashingStatus.PENDING
              ) && (
                <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-3 rounded-md mt-3">
                  <div>
                    <p className="flex items-center gap-2 text-text-muted text-sm font-medium">
                      <TbCoins className="text-lg" />
                      <span>
                        {role === Role.ADMIN || role === Role.OWNER
                          ? item?.employerSalary?.toLocaleString() ||
                            "0" + " UZS"
                          : "*****"}
                      </span>
                    </p>
                  </div>

                  <div className="text-end space-y-1">
                    {item?.invitationId?.percent &&
                    item.status === "COMPLETED" ? (
                      <p className="text-sm text-text-muted line-through">
                        {washAmount.toLocaleString()} UZS
                      </p>
                    ) : (
                      <strong className="text-lg text-text font-semibold flex items-center gap-2">
                        {item?.washAmount?.toLocaleString() || "0"} UZS
                        {item?.isBonus && item?.status === "COMPLETED" && (
                          <FiGift
                            className="text-xl text-yellow-500"
                            title="Bonus xizmat"
                          />
                        )}
                        {item?.invitationId && (
                          <div
                            title={`Taklif orqali kelgan. ${
                              item.invitationId?.percent
                                ? `${item.invitationId.percent}% chegirma`
                                : ""
                            }`}
                            className="tooltip tooltip-top"
                          >
                            <FiTag
                              className="text-green-500 text-xl"
                              title="Chegirma foizi"
                            />
                          </div>
                        )}
                      </strong>
                    )}

                    {item?.invitationId?.percent &&
                      item.status === "COMPLETED" && (
                        <strong className="text-lg text-text font-semibold flex items-center gap-2">
                          {discountedAmount.toLocaleString()} UZS
                          {item?.isBonus && item?.status === "COMPLETED" && (
                            <FiGift
                              className="text-xl text-yellow-500"
                              title="Bonus xizmat"
                            />
                          )}
                          {item?.invitationId && (
                            <div
                              title={`Taklif orqali kelgan. ${
                                item.invitationId?.percent
                                  ? `${item.invitationId.percent}% chegirma`
                                  : ""
                              }`}
                              className="tooltip tooltip-top"
                            >
                              <FiTag
                                className="text-green-500 text-xl"
                                title="Chegirma foizi"
                              />
                            </div>
                          )}
                        </strong>
                      )}
                  </div>
                </div>
              )}

            {item?.comment && (
              <div className="text-text-muted text-sm mt-3 flex gap-2">
                <FaRegCommentDots className="text-lg min-w-4" />
                <span>{item?.comment}</span>
              </div>
            )}

            <div className="flex justify-between items-center mt-3 text-text-muted text-sm">
              <span>
                {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
              </span>
            </div>
          </Box>
        );
      })}
    </div>
  );
};

export default React.memo(CarsWashings);
