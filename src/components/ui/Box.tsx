import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Box: FC<Props> = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`shadow-md md:p-6 p-4 bg-white rounded-md border border-gray-100 w-full relative ${className}`}
    >
      {children}
    </div>
  );
};

export default React.memo(Box);
