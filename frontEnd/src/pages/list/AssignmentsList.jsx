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
import { Input } from "@/components/ui/input";
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
    subject: z.string({ required_error: "Subject is required" }),
    class: z.string({ required_error: "Class is required" }),
    teacher: z.string({ required_error: "Teacher is required" }),
    date: z.string({ required_error: "date is required" }),
    time: z.string({ required_error: "time is required" }),

});


const AssignmentsList = () => {
    // -------------------
    const { data: subjectsList } = useFetch("/subjects");
    const { data: classesList } = useFetch("/classes");
    const { data: teachersList } = useFetch("/teachers");
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetch(`/assignments?page=${page}`);
    const lastPage = data?.last_page || 1;

    const {
        handleSubmit,
        register,
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
            header: "Subject",
            accessor: "subject",
        },
        {
            header: "Class",
            accessor: "class",
            // className: "hidden lg:table-cell",

        },
        {
            header: "Teacher",
            accessor: "teacher",
            className: "hidden lg:table-cell",
        },
        {
            header: "DueDate",
            accessor: "date",
            className: "hidden lg:table-cell",
        },
        {
            header: "Actions",
            accessor: "action",
        },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">
            <td className=" ">{item.subject?.name}</td>
            <td className=" py-2 ">{item.student_class.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.teacher?.nom}-{item.teacher?.prenom}</td>
            <td className=" py-2 hidden md:table-cell">{item.DueDate}</td>
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
                                    handleDelete('assignments', item.id)
                                    queryClient.invalidateQueries(["/assignments"]);
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
            const datetime = `${data.date}T${data.time}`;
            formData.append("DueDate", datetime);
            // console.log("data :",...formData);
            await CostumAxios.post("/assignments", formData);
            reset();
            queryClient.invalidateQueries(["/assignments"]);
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
                <h1 className="hidden md:block text-xl">Assignments List</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-md h-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-101"
                            >
                                <BookPlus size={20} color="white" className="mr-2" />
                                <span className="hidden sm:inline">Add Assignments</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Add New Assignments</DialogTitle>
                                <DialogDescription>Fill in the details to add a new Assignments.</DialogDescription>
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
                                        <Label htmlFor="date" className="px-1">
                                            date
                                        </Label>
                                        <Input
                                            id="date"
                                            type="date"

                                            placeholder="June 01, 2025"
                                            className="bg-background pr-10 col-span-2"
                                            {...register("date")}
                                        />

                                        {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                                    </div>

                                </div>



                                <div className=" w-1/3">
                                    <Label htmlFor="date" className="px-1">
                                        Time
                                    </Label>
                                    <Input
                                        id="date"
                                        type="time"

                                        placeholder="June 01, 2025"
                                        className="bg-background pr-10 col-span-2"
                                        {...register("time")}

                                    />
                                    {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
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

export default AssignmentsList;