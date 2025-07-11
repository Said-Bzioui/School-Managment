import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { Eye, Trash, SquareChartGantt, CheckCircle2Icon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/submitButton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import handleDelete from "@/api/controllers/handelDelete";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


const formSchema = z.object({
    titre: z.string({ required_error: "titre is required" }),
    target: z.string({ required_error: "target is required" }),
    content: z.string({ required_error: "content is required" }),

});

const AnnouncementsList = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetch(`/announcements?page=${page}`);
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

    // -------------------------------------

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
            header: "Content",
            accessor: "content",
            className: "hidden md:table-cell",

        },
        {
            header: "Target",
            accessor: "target",
            // className: "hidden lg:table-cell",
        },
        {
            header: "Actions",
            accessor: "action",
        },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">

            <td className=" py-2 ">{item.title}</td>
            <td className=" py-2  hidden md:table-cell">{item.content}</td>
            <td className=" py-2 ">{item.target}</td>
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
                                    handleDelete('announcements', item.id)
                                    queryClient.invalidateQueries(["/announcements"]);
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
            formData.append("content", data.content);
            formData.append("user_id", 1);
            formData.append("target", data.target);
            // console.log("data :",...formData);
            await CostumAxios.post("/announcements", formData);
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
                <h1 className="hidden md:block text-xl">Announcements List</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-md h-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-101"
                            >
                                <SquareChartGantt size={20} color="white" className="mr-2" />
                                <span className="hidden sm:inline">Add Results</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Add New Announcements</DialogTitle>
                                <DialogDescription>Fill in the details to add a new Announcements.</DialogDescription>
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
                                        <Label htmlFor="class_id" className="text-right">target</Label>
                                        <Select onValueChange={(value) => setValue('target', value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="target" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={'all'}>All</SelectItem>
                                                <SelectItem value={'students'}>Students</SelectItem>
                                                <SelectItem value={'parents'}>Parents</SelectItem>
                                                <SelectItem value={'teachers'}>Teachers</SelectItem>

                                            </SelectContent>
                                        </Select>
                                        {errors.target && <p className="text-red-500 text-xs">{errors.target.message}</p>}
                                    </div>

                                </div>
                                <div>
                                    <Label htmlFor="date" className="px-1">Content</Label>
                                    <Textarea  {...register("content")} className={'resize-none'} placeholder="Annoncment Message" />
                                    {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
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

export default AnnouncementsList;