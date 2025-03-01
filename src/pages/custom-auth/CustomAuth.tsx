import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { RootState } from "../../redux";

interface Props {
  role: string;
  to: string;
}

const CustomAuth: FC<Props> = ({ role, to }) => {
  const userRole = useSelector((state: RootState) => state.role.value);
  const location = useLocation(); 

  // Agar userRole berilgan role'ga mos kelmasa, faqatgina bir martalik yo'naltirish ishlaydi
  if (!role.split(",").includes(userRole)) {
    return <Navigate to={to} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default CustomAuth;

