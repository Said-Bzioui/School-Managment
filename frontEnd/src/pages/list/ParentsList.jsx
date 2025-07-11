
import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { UserPlus, Eye, Trash } from "lucide-react";
const ParentsList = () => {

    const { data, isLoading, error } = useFetch("/parents");
    console.log(data);





    const columns = [
        {
            header: "Info",
            accessor: "info",
        },
        {
            header: "Student Names",
            accessor: "students",
            className: "hidden md:table-cell",
        },
        {
            header: "Relation",
            accessor: "relation",
            className: "hidden lg:table-cell",
        },
        {
            header: "Phone",
            accessor: "phone",
            className: "hidden lg:table-cell",
        },
        {
            header: "Address",
            accessor: "address",
            className: "hidden lg:table-cell",
        },
        {
            header: "Actions",
            accessor: "action",
        },
    ];


    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">
            <td className="px-4 py-2 flex items-center space-x-2">
                <img src={"/logo.jpg"} className="w-8 h-8 border-2 border-gray-400 rounded-full object-cover" />
                <div>
                    <h1>{item?.name}</h1>
                    <h2 className="text-gray-400 ">{item?.user?.email}</h2>
                </div>
            </td>
            <td className=" py-2 hidden md:table-cell">{item.student.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.relation}</td>
            <td className=" py-2 hidden lg:table-cell">{item?.phone}</td>
            <td className=" py-2 hidden lg:table-cell">{item?.address || "Rabat"}</td>
            <td className="py-2 flex items-center space-x-2">
                <div className="bg-sky/20 p-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
                    <Eye size={24} color="gray" />
                </div>

                <div className="bg-sky/20 p-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
                    <Trash size={24} color="gray" />
                </div>

            </td>
        </tr>
    );

    return (
        <div className="w-full min-h-screen bg-white p-4 rounded-lg ">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="hidden md:block text-xl">Parents List</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <div className="bg-blue p-1 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer">
                        <UserPlus size={24} color="white" />
                    </div>
                </div>
            </div>
            <Table columns={columns} data={data && data} renderRow={renderRow} isLoading={isLoading} error={error} />

        </div>
    );
}
export default ParentsList;