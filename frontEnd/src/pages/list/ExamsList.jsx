import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { Eye, Trash, BookPlus, CheckCircle2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CostumAxios from "@/api/axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "@/components/submitButton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import handleDelete from "@/api/controllers/handelDelete";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


function formatDate(date) {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const formSchema = z.object({
    subject: z.string({ required_error: "Subject is required" }),
    class: z.string({ required_error: "Class is required" }),
    teacher: z.string({ required_error: "Teacher is required" }),
    room: z.string({ required_error: "Room is required" }),
    type: z.string({ required_error: "Type is required" }),
    from: z.string({ required_error: "Start time is required" }),
    to: z.string({ required_error: "End time is required" }),
});

const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = h.padStart(2, "0");
    const minute = m ? m.padStart(2, "0") : "00";
    return `${hour}:${minute}`;
};



const ExamsList = () => {

    const [date, setDate] = useState(new Date("2025-06-03"))
    const [datevalue, setdateValue] = useState(formatDate(date))
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetch(`/exams?page=${page}`);
    const lastPage = data?.last_page || 1;
    const {
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const queryClient = useQueryClient();

    // -------------------
    const { data: subjectsList } = useFetch("/subjects");
    const { data: classesList } = useFetch("/classes");
    const { data: teachersList } = useFetch("/teachers");
    const { data: roomsList } = useFetch("/classrooms");



    useEffect(() => {
        if (successAlert) {
            const timer = setTimeout(() => {
                setSuccessAlert(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [successAlert]);


    const columns = [
        {
            header: "Module Code",
            accessor: "subject",
        },
        {
            header: "Groupe",
            accessor: "class",
            className: "hidden lg:table-cell",

        },
        {
            header: "Formateur",
            accessor: "teacher",
            className: "hidden lg:table-cell",
        },
        {
            header: "Salle",
            accessor: "room",
            className: "hidden lg:table-cell",
        },
        {
            header: "Type",
            accessor: "type",
            className: "hidden lg:table-cell",
        },
        {
            header: "Date",
            accessor: "date",
            // className: "hidden lg:table-cell",
        },
        {
            header: "Hour",
            accessor: "start",
            className: "hidden lg:table-cell",
        },
        {
            header: "Status",
            accessor: "status",
            className: "hidden lg:table-cell",
        },


        {
            header: "Actions",
            accessor: "action",
        },
    ];
    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">

            <td className=" py-2 ">{item.subject?.code}</td>
            <td className=" py-2 hidden md:table-cell">{item.student_class?.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.teacher?.nom}-{item.teacher?.prenom}</td>
            <td className=" py-2 hidden md:table-cell">{item.classroom?.name}</td>
            <td className=" py-2 ">{item.type}</td>
            <td className=" py-2 ">{item.date}</td>

            <td className=" py-2 ">       <p className="flex space-x-1 bg-muted w-fit p-1 rounded-md ">
                    <span>{formatTime(item.start_time)}</span>
                    <span className="text-primary">-</span>
                    <span>{formatTime(item.end_time)}</span>
                </p></td>
            <td >
                <p className={` ${item.status == 'pending' ? 'text-yellow-500' : 'text-green-600'} `} 
                >{item.status}</p>
            </td>
            <td className="py-2 flex items-center space-x-2">
                <Link
                    to={`${item.id}`}
                    className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 cursor-pointer transition-all duration-200 flex items-center justify-center"
                    title="DE"
                >
                    <Eye className="w-5 h-5 text-primary" />
                </Link>




                <AlertDialog>
                    <AlertDialogTrigger>
                        <button
                            type="button"
                            className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors duration-200"
                        >
                            <Trash className="w-4 h-4 text-red-400" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    handleDelete('exams', item.id)
                                    queryClient.invalidateQueries(["/exams"]);
                                    setSuccessAlert(true)
                                }}
                            >Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>



            </td>
        </tr>
    );

    // -----------------------------------------
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("subject_id", data.subject);
            formData.append("class_id", data.class);
            formData.append("teacher_id", data.teacher);
            formData.append("classroom_id", data.room);
            formData.append("date", datevalue);
            formData.append("type", data.type);
            formData.append("start_time", data.from);
            formData.append("end_time", data.to);
            await CostumAxios.post("/exams", formData);
            reset();
            queryClient.invalidateQueries(["/lessons"]);
            setDialogOpen(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="w-full min-h-screen bg-white p-4 rounded-lg ">
            <div className="flex flex-col md:flex-row items-center justify-between">
                {successAlert &&
                    <Alert>
                        <CheckCircle2Icon color="green" />
                        <AlertTitle>
                            successfully
                        </AlertTitle>
                    </Alert>
                }
                <h1 className="hidden md:block text-xl">Exams List</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-md h-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-101"
                            >
                                <BookPlus size={20} color="white" className="mr-2" />
                                <span className="hidden sm:inline">Add Exams</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Add New Exam</DialogTitle>
                                <DialogDescription>Fill in the details to add a new Exam.</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                <div className="flex gap-4">
                                    <div className="">
                                        <Label htmlFor="subject" className="text-right">subject</Label>
                                        <Select onValueChange={(value) => setValue("subject", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="subject" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    subjectsList?.data.map(cls => (
                                                        <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="class_id" className="text-right">class</Label>
                                        <Select onValueChange={(value) => setValue("class", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    classesList?.data.map(cls => (
                                                        <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.class && <p className="text-red-500 text-xs">{errors.class.message}</p>}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="">
                                        <Label htmlFor="teacher" className="text-right">Teacher</Label>
                                        <Select onValueChange={(value) => setValue("teacher", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="teacher" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    teachersList?.data.map(cls => (
                                                        <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.teacher && <p className="text-red-500 text-xs">{errors.teacher.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="room" className="text-right">room</Label>
                                        <Select onValueChange={(value) => setValue("room", value)} name="room" id="room" className='col-span-2'>
                                            <SelectTrigger className="w-[180px] ">
                                                <SelectValue placeholder="room" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    roomsList?.data.map(room => (
                                                        <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.room && <p className="text-red-500 text-xs">{errors.room.message}</p>}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="">
                                        <Label htmlFor="date" className="px-1">
                                            Exam date
                                        </Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={datevalue}
                                            placeholder="June 01, 2025"
                                            className="bg-background pr-10 col-span-2"
                                            onChange={(e) => {
                                                const inputValue = e.target.value
                                                setdateValue(inputValue)
                                                const parsedDate = new Date(inputValue)
                                                setDate(parsedDate)
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "ArrowDown") {
                                                    e.preventDefault()
                                                }
                                            }}
                                        />
                                        {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}

                                    </div>

                                    <div className="">
                                        <Label htmlFor="type" className="text-right">Type</Label>

                                        <Select onValueChange={(value) => setValue("type", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='cc1'>CC1</SelectItem>
                                                <SelectItem value='cc2'>CC2</SelectItem>
                                                <SelectItem value='cc3'>CC3</SelectItem>
                                                <SelectItem value='EFM'>EFM</SelectItem>

                                            </SelectContent>
                                        </Select>
                                        {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="">
                                        <Label htmlFor="type" className="text-right">FROM</Label>

                                        <Select onValueChange={(value) => setValue("from", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="from" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='08:30'>08:30</SelectItem>
                                                <SelectItem value='11:00'>11:00</SelectItem>
                                                <SelectItem value='13:30'>13:30</SelectItem>
                                                <SelectItem value='16:00'>16:00</SelectItem>
                                                <SelectItem value='18:30'>18:30</SelectItem>

                                            </SelectContent>
                                        </Select>
                                        {errors.from && <p className="text-red-500 text-xs">{errors.from.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="room" className="text-right">TO</Label>

                                        <Select onValueChange={(value) => setValue("to", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="to" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='11:00'>11:00</SelectItem>
                                                <SelectItem value='13:30'>13:30</SelectItem>
                                                <SelectItem value='16:00'>16:00</SelectItem>
                                                <SelectItem value='18:30'>18:30</SelectItem>

                                            </SelectContent>
                                        </Select>
                                        {errors.to && <p className="text-red-500 text-xs">{errors.to.message}</p>}
                                    </div>

                                </div>

                                <DialogFooter>
                                    <SubmitButton isSubmit={isSubmitting} />
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
            <Table columns={columns} data={data && data.data} renderRow={renderRow} isLoading={isLoading} error={error} page={page}
                setPage={setPage}
                lastPage={lastPage} />

        </div>
    );
};

export default ExamsList;