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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import handleDelete from "@/api/controllers/handelDelete";



const formSchema = z.object({
    subject: z.string({ required_error: "Subject is required" }),
    class: z.string({ required_error: "Class is required" }),
    student: z.string({ required_error: "student is required" }),
    type: z.string({ required_error: "date is required" }),
    note: z.string({ required_error: "note is required" }),

});

const ResultsList = () => {
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

    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetch(`/results?page=${page}`);
    const lastPage = data?.last_page || 1;
    // -------------------
    const { data: subjectsList } = useFetch("/subjects");
    const { data: classesList } = useFetch("/classes");
    // -----------------------------------------
    const [selectedClass, SetselectedClass] = useState()
    const handelStudents = async (id) => {
        setValue("class", id)
        const { data: classe } = await CostumAxios(`/classes/${id}`);
        SetselectedClass(classe)
    }
    // -----------------------------------------

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
            header: "Student",
            accessor: "student",
            // className: "hidden lg:table-cell",
        },
        {
            header: "Subject Code",
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
            header: "Actions",
            accessor: "action",
        },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">
            <td className=" py-2 ">{item.student?.nom}-{item.student?.prenom}</td>
            <td className=" py-2 ">{item.subject?.code}</td>
            <td className=" py-2 hidden md:table-cell">{item.type}</td>
            <td className=" py-2 hidden md:table-cell">{item.note}</td>

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
                                    handleDelete('results', item.id)
                                    queryClient.invalidateQueries(["/results"]);

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
            formData.append("teacher_id", 1);
            formData.append("class_id", data.class);
            formData.append("student_id", data.student);
            formData.append("type", data.type);
            formData.append("note", data.note);
            await CostumAxios.post("/results", formData);
            reset();
            queryClient.invalidateQueries(["/results"]);
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
                <h1 className="hidden md:block text-xl">Results List</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-md h-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-101"
                            >
                                <BookPlus size={20} color="white" className="mr-2" />
                                <span className="hidden sm:inline">Add Results</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Add New Results</DialogTitle>
                                <DialogDescription>Fill in the details to add a new Results.</DialogDescription>
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
                                        <Select onValueChange={(value) => handelStudents(value)}>
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
                                        <Label htmlFor="teacher" className="text-right">Student</Label>
                                        <Select onValueChange={(value) => setValue("student", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Student" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    selectedClass?.students.map(cls => (
                                                        <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.student && <p className="text-red-500 text-xs">{errors.student.message}</p>}
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

                                <div className="">
                                    <Label htmlFor="date" className="px-1">
                                        La Note
                                    </Label>
                                    <Input
                                        id="date"
                                        type="number"
                                        placeholder="Saiser La Note"
                                        className="bg-background pr-10 col-span-2"
                                        {...register("note")}
                                    />
                                    {errors.note && <p className="text-red-500 text-xs">{errors.note.message}</p>}
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

export default ResultsList;