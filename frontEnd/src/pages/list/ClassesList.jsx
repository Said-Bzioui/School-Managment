import { useFetch } from "@/api/fetching";
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { Eye, Trash, Grid2x2Plus, CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    name: z.string().min(3, "Le Nom est requis"),
    poll_id: z.string().min(1, "Le poll est requis"),
    filier: z.string().min(2, "La filier est requis"),
    niveu: z.enum(["1", "2"], { required_error: "Veuillez choisir le niveau" }),
    capacite: z.string().min(1, "La capacite requise"),
    teacher_id: z.string().min(1, "L'enseignant est requis"),
});





const ClassesList = () => {


    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetch(`/classes?page=${page}`);
    const lastPage = data?.last_page || 1;
    const { data: teachersList } = useFetch("/teachers");
    console.log(teachersList?.data)

    const { data: pollsList, } = useFetch("/polls");
    const {
        register,
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
            header: "Group",
            accessor: "name",
        },
        {
            header: "Poll",
            accessor: "poll",
            className: "hidden md:table-cell",

        },
        {
            header: "Filier",
            accessor: "filier",
            className: "hidden md:table-cell",

        },
        {
            header: "Niveu",
            accessor: "niveu",
            className: "hidden md:table-cell",

        },
        {
            header: "Capacité",
            accessor: "capacity",
            className: "hidden md:table-cell",

        },

        {
            header: "Actions",
            accessor: "action",
        },
    ];
    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">

            <td className=" py-2 ">{item.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.poll?.name}</td>
            <td className=" py-2 hidden md:table-cell">{item.filier}</td>
            <td className=" py-2 hidden md:table-cell">
                {item.niveu == 1 ? (
                    <span>1ére Année</span>
                ) : (
                    <span>2éme Année</span>
                )}

            </td>
            <td className=" py-2 hidden md:table-cell">{item.capacite}</td>
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
                                    handleDelete('classes', item.id)
                                    queryClient.invalidateQueries(["/classes"]);
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
            formData.append("name", data.name);
            formData.append("teacher_id", data.teacher_id);
            formData.append("niveu", data.niveu);
            formData.append("polls_id", data.poll_id);
            formData.append("filier", data.filier);
            formData.append("capacite", data.capacite);
            await CostumAxios.post("/classes", formData);
            reset();
            queryClient.invalidateQueries(["/classes"]);
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
                <h1 className="hidden md:block text-xl">La List Des Groups</h1>
                <div className="flex space-x-2">
                    <SearchBox />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>

                            <Button
                                variant="default"
                                className="cursor-pointer py-4.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-md h-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-101"
                            >
                                <span className="hidden sm:inline">Ajouter Un Group</span>
                                <Grid2x2Plus size={20} color="white" className="mr-2" />

                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Add New Class</DialogTitle>
                                <DialogDescription>Fill in the details to add a new Class.</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="">
                                        <Label htmlFor="name" className="text-right">Name</Label>
                                        <Input id="name" placeholder="Enter Class Name" {...register("name")} className="col-span-3" />
                                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="poll" className="text-right">poll</Label>
                                        <Select onValueChange={(value) => setValue("poll_id", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="poll" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    pollsList?.map(teacher => (
                                                        <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.poll_id && <p className="text-red-500 text-xs">{errors.poll_id.message}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="">
                                        <Label htmlFor="filier" className="text-right">filier</Label>
                                        <Input type="text" placeholder="Enter Filier" id="filier" {...register("filier")} className="col-span-3" />
                                        {errors.filier && <p className="text-red-500 text-xs">{errors.filier.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="niveu" className="text-right">niveu</Label>
                                        <Select onValueChange={(value) => setValue("niveu", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="niveu" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1ére Anneé</SelectItem>
                                                <SelectItem value="2">2éme Anneé</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.niveu && <p className="text-red-500 text-xs">{errors.niveu.message}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="">
                                        <Label htmlFor="capacite" className="text-right">capacite</Label>
                                        <Input type="number" placeholder="Enter capacite" id="capacite" {...register("capacite")} className="col-span-3" />
                                        {errors.capacite && <p className="text-red-500 text-xs">{errors.capacite.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="Teacher" className="text-right">teacher</Label>
                                        <Select onValueChange={(value) => setValue("teacher_id", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Teacher" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    teachersList?.data.map(teacher => (
                                                        <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.teacher_id && <p className="text-red-500 text-xs">{errors.teacher_id.message}</p>}
                                    </div>
                                </div>




                                <DialogFooter>
                                    {/* Submit Button */}
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

export default ClassesList;