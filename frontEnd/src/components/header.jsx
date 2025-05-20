import { useEffect, useState } from "react";
import { SearchBox } from "./search";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

export function Header() {
    const [user, setUser] = useState({});
    const [OpenMenu, setOpenMenu] = useState(false);
        const location = useLocation();
        let path = location.pathname.split('/').filter(item => item !== '');
        console.log(path[0]);
    const MenuHandel = () => {
        setOpenMenu(!OpenMenu);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));

    }, []);

    return (
        <div className="bg-white flex items-center justify-between px-4  h-15">
            <SearchBox />
            <div className="relative  flex items-center space-x-2 ">
                <div className="flex flex-col items-end text-gray-600  ">
                    <span className=" text-md hidden sm:block">{user.name}</span>
                    <span className=" text-sm -mt-1 hidden sm:block">{user.role}</span>
                </div>
                <div className="rounded-full cursor-pointer" onClick={MenuHandel}>
                    <img src="../avatar.png" className="w-9 rounded-full" />
                </div>
                <div className={`${OpenMenu ? 'block' : 'hidden'} bg-white rounded-2xl shadow  text-start flex flex-col items-start space-y-2   absolute top-15 right-10 p-2 w-45`} >
                    <Link
                        to={`${path[0]}/profile`}
                        className={`flex items-center  w-full gap-4 p-2 text-gray-500  rounded-md hover:bg-gray-200`}
                    >
                        <img src={"/profile.png"} alt="" width={20} height={20} />
                        <span className="">{'Profile'}</span>
                    </Link>


                    <Link
                        to={`${path[0]}/settings`}
                        className={`flex items-center  w-full gap-4 p-2 text-gray-500  rounded-md hover:bg-gray-200`}
                    >
                        <img src={"/setting.png"} alt="" width={20} height={20} />
                        <span className="">{'Settings'}</span>
                    </Link>
                    <Link
                        to={"/logout"}
                        className={`flex items-center  w-full gap-4 p-2 py-1 mt-6 text-red-500   rounded-md hover:bg-red-400 hover:text-white`}
                    >
                        <LogOut size={24}/>
                        <span className="text-lg ">Logout</span>
                    </Link>
                </div>
            </div>
        </div >

    )
}