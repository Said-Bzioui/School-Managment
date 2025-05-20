import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { UserPlus, Eye, Trash } from "lucide-react";

const LessonsList = () => {
    const { data, isLoading, error } = useFetch("/lessons");
    console.log(data);




    const columns = [
        {
            header: "Subject",
            accessor: "subject",
        },
        {
            header: "Class",
            accessor: "class",
        },
        {
            header: "Teacher",
            accessor: "teacher",
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

    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">

            <td className=" py-2 ">{item.subject.name}</td>
            <td className=" py-2 ">{item.class.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.teacher.user_id}</td>
            <td className=" py-2 hidden md:table-cell">
                {item.day}
                <p className="flex space-x-1">
                    <span>{item.start_time}</span>
                    <span className="text-black">TO</span>
                    <span>{item.end_time}</span>
                </p>

            </td>
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
                <h1 className="hidden md:block text-xl">Lessons List</h1>
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

export default LessonsList;