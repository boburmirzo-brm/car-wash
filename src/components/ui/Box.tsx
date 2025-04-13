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
      className={`shadow-md md:p-6 p-4 bg-card rounded-md border border-border text-text w-full relative ${className}`}
    >
      {children}
    </div>
  );
};

export default React.memo(Box);
