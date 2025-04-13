import React, { FC } from "react";

const CarNumber: FC<{ plateNumber?: string | null }> = ({ plateNumber }) => {
  return (
    <b
      className={`border-2  border-border bg-bg px-2 py-1 rounded-md text-base uppercase text-text`}
    >
      {plateNumber ? plateNumber?.plateNumberFormat() : "Nomer Yoq"}
    </b>
  );
};

export default React.memo(CarNumber);
