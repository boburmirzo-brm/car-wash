import { Button } from "antd"
import logo from "@/assets/images/pwa-192x192.png"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-slate-100 sticky top-0 left-0 z-40">
        <div className="container mx-auto">
            <nav className="h-[60px] max-[500px]:h-[50px] flex items-center justify-between">
                <Link to={"/employer"} className="">
                  <img className="w-[50px]" src={logo} alt="logo" />
                </Link>
                <Button>Profile</Button>
            </nav>
        </div>
    </header>
  )
}

export default Header