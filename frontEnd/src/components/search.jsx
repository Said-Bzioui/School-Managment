import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchBox() {
    return (
        <div className=" relative">
                <span className="p-0.5 text-gray-300 absolute left-1.5 top-1/2 -translate-y-1/2  "><Search /></span>

            <Input className="border border-gray-300 pl-10 rounded-xl" placeholder="search..." >
            </Input>
        </div>

    )
}