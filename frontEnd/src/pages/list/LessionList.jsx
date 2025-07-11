import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { Eye, Trash, BookPlus, CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CostumAxios from "@/api/axios";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "@/components/submitButton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import handleDelete from "@/api/controllers/handelDelete";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";



const formSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
    class: z.string().min(1, "Class is required"),
    teacher: z.string().min(1, "Teacher is required"),
    room: z.string().min(1, "Room is required"),
    day: z.string().min(1, "Day is required"),
    from: z.string().min(1, "Start time is required"),
    to: z.string().min(1, "End time is required"),
});

const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = h.padStart(2, "0");
    const minute = m ? m.padStart(2, "0") : "00";
    return `${hour}:${minute}`;
};



const LessonsList = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetch(`/lessons?page=${page}`);
    const lastPage = data?.last_page || 1;

    // -------------------
    const { data: subjectsList } = useFetch("/subjects");
    const { data: classesList } = useFetch("/classes");
    const { data: teachersList } = useFetch("/teachers");
    const { data: roomsList } = useFetch("/classrooms");

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
            header: "Module",
            accessor: "subject",
        },
        {
            header: "Group",
            accessor: "class",
        },
        {
            header: "Formateur",
            accessor: "teacher",
            className: "hidden md:table-cell",

        },
        {
            header: "Salle",
            accessor: "room",
            className: "hidden md:table-cell",

        },
        {
            header: "Jour",
            accessor: "date",
            className: "hidden md:table-cell",

        },
        {
            header: "Seance",
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

            <td className=" py-2 ">{item.subject.name}</td>
            <td className=" py-2 ">{item.class.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.teacher.nom}-{item.teacher.prenom}</td>
            <td className=" py-2 hidden md:table-cell">{item.classroom.name}</td>
            <td className=" py-2 hidden md:table-cell">
                {item.day}
            </td>
            <td className=" py-2 hidden md:table-cell">
                <p className="flex space-x-1 bg-muted w-fit p-1 rounded-md ">
                    <span>{formatTime(item.start_time)}</span>
                    <span className="text-primary">-</span>
                    <span>{formatTime(item.end_time)}</span>
                </p>
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
                                    handleDelete('lessons', item.id)
                                    queryClient.invalidateQueries(["/lessons"]);
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
            formData.append("day", data.day);
            formData.append("start_time", data.from);
            formData.append("end_time", data.to);
            await CostumAxios.post("/lessons", formData);
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
                <h1 className="hidden md:block text-xl">La List Des Leçons</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                className="cursor-pointer py-4.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-md h-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-101"
                            >
                                <span className="hidden sm:inline">Ajouter Un Leçons</span>
                                <BookPlus size={20} color="white" className="" />

                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Add New Lesson</DialogTitle>
                                <DialogDescription>Fill in the details to add a new Lesson.</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="grow">
                                        <Label htmlFor="subject" className="text-right">subject</Label>
                                        <Select onValueChange={(value) => setValue("subject", value)}>
                                            <SelectTrigger className="w-full">
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
                                    <div className="grow">
                                        <Label htmlFor="class_id" className="text-right">class</Label>
                                        <Select onValueChange={(value) => setValue("class", value)}>
                                            <SelectTrigger className="w-full">
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
                                    <div className="grow">
                                        <Label htmlFor="teacher" className="text-right">Teacher</Label>
                                        <Select onValueChange={(value) => setValue("teacher", value)}>
                                            <SelectTrigger className="w-full">
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

                                </div>
                                <div className="flex items-center gap-4 justify-between">
                                    <div className="">
                                        <Label htmlFor="room" className="text-right">room</Label>
                                        <Select onValueChange={(value) => setValue("room", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="room" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    roomsList?.data.map(cls => (
                                                        <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.room && <p className="text-red-500 text-xs">{errors.room.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="day" className="text-right">day</Label>
                                        <Select onValueChange={(value) => setValue("day", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="day" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Monday'>Monday</SelectItem>
                                                <SelectItem value='Tuesday'>Tuesday</SelectItem>
                                                <SelectItem value='Wednesday'>Wednesday</SelectItem>
                                                <SelectItem value='Thursday'>Thursday</SelectItem>
                                                <SelectItem value='Friday'>Friday</SelectItem>
                                                <SelectItem value='Saturday'>Saturday</SelectItem>
                                                <SelectItem value='Sunday'>Sunday</SelectItem>

                                            </SelectContent>
                                        </Select>
                                        {errors.day && <p className="text-red-500 text-xs">{errors.day.message}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 justify-between">
                                    <div className="">
                                        <Label htmlFor="room" className="text-right">FROM</Label>

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
                                                <SelectItem value='08:30'>08:30</SelectItem>
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

export default LessonsList;