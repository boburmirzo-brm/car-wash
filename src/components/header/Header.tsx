import { Button } from "antd"

const Header = () => {
  return (
    <header className="bg-slate-100">
        <div className="container mx-auto">
            <nav className="h-[60px] flex items-center justify-between">
                <h2 className="text-2xl font-medium text-primary select-none">Car Wash</h2>
                <Button>Profile</Button>
            </nav>
        </div>
    </header>
  )
}

export default Header