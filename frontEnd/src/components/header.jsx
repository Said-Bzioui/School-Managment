import { useEffect, useState } from "react";
import { SearchBox } from "./search";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
    const [user, setUser] = useState({});
    const [userData, setuserData] = useState({});
    const location = useLocation();
    const backendUrl = import.meta.env.VITE_APP_BACKEND;
    let path = location.pathname.split('/').filter(item => item !== '');

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        setuserData(JSON.parse(localStorage.getItem("userData")));
    }, []);
    console.log(user)
    console.log(userData)
    return (
        <div className="bg-white flex items-center justify-between px-4  h-15">
            <SearchBox />
            <div className="relative  flex items-center space-x-2 ">
                <div className="flex flex-col items-end text-gray-600  ">
                    <span className=" text-md hidden sm:block">{userData?.nom} {userData?.prenom}</span>
                    <span className=" text-sm -mt-1 hidden sm:block">{`${user?.role}`}</span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer ring-0 outline-none'>
                        <img src={userData?.photo ? `${backendUrl}/profiles/${userData?.photo}` : "/avatar.png"} alt="" className=" rounded-full" width={40} height={40} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                to={`${path[0]}/profile`}
                                className={`flex items-center  w-full gap-4 p-2 text-gray-500  rounded-md hover:bg-muted`}
                            >
                                <img src={"/profile.png"} alt="" width={20} height={20} />
                                <span className="">{'Profile'}</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                to={`${path[0]}/settings`}
                                className={`flex items-center  w-full gap-4 p-2 text-gray-500  rounded-md hover:bg-muted`}
                            >
                                <img src={"/setting.png"} alt="" width={20} height={20} />
                                <span className="">{'Settings'}</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>

                            <Link
                                to={"/logout"}
                                className={`flex items-center  w-full gap-4 p-2 py-1 mt-6 text-red-400   rounded-md hover:bg-red-400 hover:text-white`}
                            >
                                <LogOut size={24} />
                                <span className="text-lg ">Logout</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div >

    )
}