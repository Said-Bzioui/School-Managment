import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { UserPlus, Eye, Trash } from "lucide-react";
import { eventsData } from "../../lib/data";
const EventsList = () => {
    const columns = [
        {
            header: "Title",
            accessor: "title",
        },
        {
            header: "Class",
            accessor: "class",
            className: "hidden md:table-cell",

        },
        {
            header: "Date",
            accessor: "date",
            // className: "hidden lg:table-cell",
        },
        {
            header: "Start In",
            accessor: "startTime",
            className: "hidden lg:table-cell",
        },
        {
            header: "Ends In",
            accessor: "endTime",
            className: "hidden lg:table-cell",
        },
 
        {
            header: "Actions",
            accessor: "action",
        },
    ];

    const data = eventsData;
    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">

            <td className=" py-2 ">{item.title}</td>
            <td className=" py-2 hidden md:table-cell">{item.class}</td>
            <td className=" py-2 ">{item.date}</td>
            <td className=" py-2 hidden lg:table-cell">{item.startTime}</td>
            <td className=" py-2 hidden lg:table-cell">{item.endTime}</td>
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
                <h1 className="hidden md:block text-xl">Events List</h1>
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

export default EventsList;