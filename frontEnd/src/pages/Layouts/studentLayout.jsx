// import { Outlet } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { StudentMenu } from "@/components/adminstration/studentMenu";

export function StudentLayout() {
    return (
        <div className=" min-h-screen flex ">
            {/* Left Side */}
            <div className="w-[14%] md:w-[8%] lg:w-[14%] h-full    ">
                <StudentMenu />
            </div>
            {/* Right Side */}
            <div className="w-[86%] md:w-[92%] lg:w-[86%] bg-muted min-h-screen">
                <Header />
                <div className="flex flex-col lg:flex-row m-4 space-y-4 space-x-4 rounded-md">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}