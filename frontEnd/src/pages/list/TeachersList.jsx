
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { UserPlus, Eye, Trash } from "lucide-react";
import { useFetch } from "@/api/fetching";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";



const TeachersList = () => {
    const { data, isLoading, error } = useFetch("/teachers");
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
        { header: "Info", accessor: "info" },
        { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
        { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
        { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
        { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
        // { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
        { header: "Actions", accessor: "action" },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">
            <td className="px-4 py-2 flex items-center space-x-2">
                <img src={item?.photo} className="w-8 h-8 rounded-full object-cover" />
                <div>
                    <h1>{item?.user?.name}</h1>
                    <h2 className="text-gray-400 ">{item?.user?.email}</h2>
                </div>
            </td>
            <td className="py-2 hidden md:table-cell">{item.id}</td>
            <td className="py-2 hidden md:table-cell">{item.subjects?.map(subject => subject.name).join(',')}</td>
            <td className="py-2 hidden md:table-cell">{item.classes?.map(c => c.name).join(',')}</td>
            <td className="py-2 hidden lg:table-cell">{item?.user?.phone}</td>
            {/* <td className="py-2 hidden lg:table-cell">{item?.user?.address}</td> */}
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
        <div className="w-full min-h-screen bg-white p-4 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="hidden md:block text-xl">Teachers List</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <div className="bg-blue p-1 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer">
                        
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="" className={"cursor-pointer"}><UserPlus size={24} color="white" /></Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-white">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Username
                                        </Label>
                                        <Input id="username" value="@peduarte" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <Table columns={columns} data={data} renderRow={renderRow} />


        </div>
    );
};

export default TeachersList;
