import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

const Auth: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.access_token);
  const location = useLocation();

  // Sahifalar ro‘yxati — token bo‘lmasa ham kirish mumkin
  const publicPaths = ["/login", "/subscription"];

  // Agar current path public bo‘lsa, to‘g‘ridan-to‘g‘ri chiqish
  if (publicPaths.includes(location.pathname)) {
    return <Outlet />;
  }

  // Aks holda, token bo‘lsa sahifani ko‘rsatamiz, yo‘q bo‘lsa loginga yo‘naltiramiz
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default React.memo(Auth);
