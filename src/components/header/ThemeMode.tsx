import { RootState } from "@/redux";
import { setTheme } from "@/redux/features/theme-mode.slice";
import React from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const ThemeMode = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.themeMode.value);

 

  return (
    <button
      className="cursor-pointer flex justify-center hover:bg-bg items-center size-8 rounded-full  text-text-muted"
      onClick={() => dispatch(setTheme())}
    >
      {theme === "dark" ? <FaRegSun /> : <FaRegMoon />}
    </button>
  );
};

export default React.memo(ThemeMode);
