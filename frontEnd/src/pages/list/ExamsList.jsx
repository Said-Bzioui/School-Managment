import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { UserPlus, Eye, Trash } from "lucide-react";

const ExamsList = () => {

    const { data, isLoading, error } = useFetch("/exams");
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
            header: "Subject",
            accessor: "subject",
        },
        {
            header: "Class",
            accessor: "class",
            className: "hidden lg:table-cell",

        },
        {
            header: "Teacher",
            accessor: "teacher",
            className: "hidden lg:table-cell",
        },
        {
            header: "Room",
            accessor: "room",
            className: "hidden lg:table-cell",
        },
        {
            header: "Date",
            accessor: "date",
            // className: "hidden lg:table-cell",
        },
        {
            header: "Actions",
            accessor: "action",
        },
    ];
    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">

            <td className=" py-2 ">{item.subject?.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.student_class?.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.teacher?.user_id}</td>
            <td className=" py-2 hidden md:table-cell">{item.classroom?.name}</td>
            <td className=" py-2 ">{item.date}</td>
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
                <h1 className="hidden md:block text-xl">Exams List</h1>
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

export default ExamsList;