import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { Eye, Trash, CalendarPlus, CheckCircle2Icon } from "lucide-react";
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
    titre: z.string({ required_error: "Subject is required" }),
    class: z.string({ required_error: "Class is required" }),
    date: z.string({ required_error: "student is required" }),
    s_time: z.string({ required_error: "date is required" }),
    e_time: z.string({ required_error: "note is required" }),

});

const EventsList = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetch(`/events?page=${page}`);
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

    // -------------------
    const { data: classesList } = useFetch("/classes");



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
    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">

            <td className=" py-2 ">{item.title}</td>
            <td className=" py-2 hidden md:table-cell">{item.class.name}</td>
            <td className=" py-2 ">{item.date}</td>
            <td className=" py-2 hidden lg:table-cell">{item.start_time}</td>
            <td className=" py-2 hidden lg:table-cell">{item.end_time}</td>
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
                                    handleDelete('events', item.id)
                                    queryClient.invalidateQueries(["/events"]);
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
            formData.append("title", data.titre);
            formData.append("description", 'testing');
            formData.append("class_id", data.class);
            formData.append("created_by", 1);
            formData.append("date", data.date);
            formData.append("start_time", data.s_time);
            formData.append("end_time", data.e_time);
            // console.log("data :",...formData);
            await CostumAxios.post("/events", formData);
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
                <h1 className="hidden md:block text-xl">Events List</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-md h-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-101"
                            >
                                <CalendarPlus size={20} color="white" className="mr-2" />
                                <span className="hidden sm:inline">Add Events</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Add New Events</DialogTitle>
                                <DialogDescription>Fill in the details to add a new Events.</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                <div className="flex gap-4">
                                    <div className="">
                                        <Label htmlFor="date" className="px-1">
                                            Titre
                                        </Label>
                                        <Input
                                            id="date"
                                            placeholder="Titre"
                                            className="bg-background pr-10 col-span-2"
                                            {...register("titre")}
                                        />
                                        {errors.titre && <p className="text-red-500 text-xs">{errors.titre.message}</p>}

                                    </div>

                                    <div className="">
                                        <Label htmlFor="class_id" className="text-right">class</Label>
                                        <Select onValueChange={(value) => setValue('class', value)}>
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
                                <div className="flex gap-4">

                                    <div className="">
                                        <Label htmlFor="date" className="px-1">
                                            Start Time
                                        </Label>
                                        <Input
                                            id="date"
                                            type="time"
                                            placeholder="June 01, 2025"
                                            className="bg-background pr-10 "
                                            {...register("s_time")}

                                        />
                                        {errors.s_time && <p className="text-red-500 text-xs">{errors.s_time.message}</p>}

                                    </div>

                                    <div className="">
                                        <Label htmlFor="date" className="px-1">
                                            End Time
                                        </Label>
                                        <Input
                                            id="date"
                                            type="time"

                                            placeholder="June 01, 2025"
                                            className="bg-background pr-10"
                                            {...register("e_time")}

                                        />
                                        {errors.e_time && <p className="text-red-500 text-xs">{errors.e_time.message}</p>}

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

export default EventsList;