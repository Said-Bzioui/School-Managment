// import { Outlet } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { AdminMenu } from "../../components/adminstration/AdminMenu";
import { Header } from "../../components/header";

export function AdminLayout() {
    return (
        <div className=" min-h-screen flex ">
            {/* Left Side */}
            <div className="w-[14%] md:w-[8%] lg:w-[14%] h-full    ">
                <AdminMenu />
            </div>
            {/* Right Side */}
            <div className="w-[86%] md:w-[92%] lg:w-[86%] bg-sky-200/10 min-h-screen">
                <Header />
                <div className="flex flex-col lg:flex-row m-4 space-y-4 space-x-4 rounded-md">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}