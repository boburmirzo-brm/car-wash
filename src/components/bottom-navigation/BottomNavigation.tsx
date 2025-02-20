import { NavLink } from "react-router-dom"
import {HomeOutlined, AppstoreAddOutlined, UserOutlined} from "@ant-design/icons"
import "./style.css"

const BottomNavigation = () => {
  return (
    <>
      <div className="max-w-[360px] flex p-1 justify-around gap-1 w-full h-[60px] bg-slate-200/50 backdrop-blur-[4px] fixed bottom-3 left-[50%] translate-x-[-50%] rounded-[10px] z-50">
        <NavLink end={true} className={`bottom-navigation text-gray-700 flex-1 flex items-center justify-center text-[20px]`} to={'/employer'}>
          <HomeOutlined />
        </NavLink>
        <NavLink className={`bottom-navigation text-gray-700 flex-1 flex items-center justify-center text-[20px]`} to={'/employer/order'}>
          <AppstoreAddOutlined />
        </NavLink>
        <NavLink className={`bottom-navigation text-gray-700 flex-1 flex items-center justify-center text-[20px]`} to={'/employer/profile'}>
          <UserOutlined />
        </NavLink>
      </div>
    </>
  )
}

export default BottomNavigation