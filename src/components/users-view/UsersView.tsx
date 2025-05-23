import React, { FC } from "react";
import TelPopUp from "../tel-pop-up/TelPopUp";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { Role } from "@/constant";

interface Props {
  data: any;
}

const UserView: FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      {data?.map((user: any) => (
        <div
          key={user._id}
          className="flex justify-between py-4 max-[500px]:p-3 border-t border-border max-[700px]:flex-col max-[700px]:items-start"
        >
          <div>
            <Link
              to={`/${user.role === Role.ADMIN ? "admins" : "employees"}/user/${
                user._id
              }${user.role === Role.ADMIN ? "/expense-history" : ""}`}
              className="font-medium hover:underline"
            >
              {user.f_name} {user.l_name}
            </Link>
            <Link
              to={`/${user.role === Role.ADMIN ? "admins" : "employees"}/user/${
                user._id
              }${user.role === Role.ADMIN ? "/expense-history" : ""}`}
              className="text-text-muted my-1 block hover:underline"
            >
              @{user.username}
            </Link>
          </div>
          <div className="text-right flex flex-col max-[700px]:w-full max-[700px]:justify-end">
            {user.role === Role.EMPLOYEE && (
              <Title
                level={4}
                type={
                  user.budget === 0
                    ? "secondary"
                    : user.budget > 0
                    ? "success"
                    : "danger"
                }
                style={{ marginBottom: 0 }}
              >
                {user.budget?.toLocaleString() || "0"} UZS
              </Title>
            )}

            <TelPopUp phoneNumber={user.tel_primary} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(UserView);
