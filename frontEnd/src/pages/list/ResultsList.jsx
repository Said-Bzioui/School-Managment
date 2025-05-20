import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { UserPlus, Eye, Trash } from "lucide-react";
const ResultsList = () => {

    const { data, isLoading, error } = useFetch("/results");
    console.log(data);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-white p-4 rounded-lg flex justify-center items-center">
                <div className=" animate-spin w-[50px] h-[50px] border-4 border-gray-100 border-t-blue-500 rounded-full"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="w-full min-h-screen  bg-white p-4 rounded-lg flex justify-center items-center">
                <p className="text-red-500 text-[18px] text-center mt-5">Cnnot get Teachers ! Please try again later.</p>
            </div>
        );
    }




    const columns = [
          {
            header: "Student",
            accessor: "student",
            // className: "hidden lg:table-cell",
        },
        {
            header: "Subject",
            accessor: "subject",
        },
        {
            header: "Type",
            accessor: "type",
            className: "hidden md:table-cell",
        },
        {
            header: "Notes",
            accessor: "notes",
            className: "hidden md:table-cell",
        },
        {
            header: "Date",
            accessor: "date",
            className: "hidden md:table-cell",
        },
        
        {
            header: "Actions",
            accessor: "action",
        },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">
            <td className=" py-2 ">{item.student?.cef}</td>
            <td className=" py-2 ">{item.subject?.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.type}</td>
            <td className=" py-2 hidden md:table-cell">{item.note}</td>
            <td className=" py-2 hidden md:table-cell">{item.date}</td>

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
                <h1 className="hidden md:block text-xl">Results List</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <div className="bg-blue p-1 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer">
                        <UserPlus size={24} color="white" />
                    </div>
                </div>
            </div>
            <Table columns={columns} data={data} renderRow={renderRow} />
        </div>
    );
};

export default ResultsList;