import React from "react"
import { NavLink } from "react-router-dom"
import {HomeOutlined, AppstoreAddOutlined, UserOutlined} from "@ant-design/icons"
import "./style.css"

const BottomNavigation = () => {
  return (
    <>
      <div className="max-w-[360px] max-[500px]:max-w-[100%] flex p-1 justify-around gap-1 w-full h-[60px] max-[500px]:h-[50px] bg-slate-200/50 backdrop-blur-[4px] fixed bottom-3 max-[500px]:bottom-0 left-[50%] translate-x-[-50%] rounded-[10px] max-[500px]:rounded-b-[0] z-50">
        <NavLink end={true} className={`bottom-navigation text-gray-700 flex-1 flex items-center justify-center text-[20px]`} to={'/employer'}>
          <HomeOutlined />
        </NavLink>
        <NavLink className={`bottom-navigation text-gray-700 flex-1 flex items-center justify-center text-[20px]`} to={'/employer/order'}>
          <AppstoreAddOutlined />
        </NavLink>
        <NavLink className={`bottom-navigation text-gray-700 flex-1 flex items-center justify-center text-[20px]`} to={'/profile'}>
          <UserOutlined />
        </NavLink>
      </div>
    </>
  )
}

export default React.memo(BottomNavigation)