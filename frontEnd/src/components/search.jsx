import { Search } from "lucide-react";

export function SearchBox() {
    return (
        <div className="flex items-center border-2 border-gray-300 w-56  h-9 rounded-full px-2">
            <span className="text-xl p-0.5 text-gray-300"><Search/></span>
            <input type="text" className=" w-full h-full px-2 outline-none  " placeholder="Search..." />
        </div>
    )
}