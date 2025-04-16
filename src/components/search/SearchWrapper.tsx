import { useParamsHook } from "@/hooks/useParamsHook";
import { Input } from "antd";
import React, { ChangeEvent } from "react";

const SearchWrapper = () => {
  const { setParam, removeParam, getParam } = useParamsHook();
  let value = getParam("q") || "";

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setParam("page", "1")
      setParam("q", e.target.value);
    } else {
      removeParam("q");
    }
  };
  return (
    <Input
      placeholder="Qidirish..."
      value={value}
      onChange={handleChangeInput}
    />
  );
};

export default React.memo(SearchWrapper);
