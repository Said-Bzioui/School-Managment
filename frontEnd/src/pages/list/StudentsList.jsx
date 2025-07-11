
import { SearchBox } from "../../components/search";
import Table from "../../components/Table";
import { UserPlus, Eye, Trash, Upload, Phone, Mail, User, VenusAndMars, CheckCircle2Icon } from "lucide-react";
import { useFetch } from "@/api/fetching";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"
import handleDelete from "@/api/controllers/handelDelete";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "@/components/submitButton";


const formSchema = z.object({
    nom: z.string().min(3, "au moins 3 caractères"),
    prenom: z.string().min(3, "au moins 3 caractères"),
    email: z.string().email("L'email n'est pas valide"),
    phone: z.string().min(10, "Le numéro n'est pas valide"),
    address: z.string().min(10, "au moins 10 caractères"),
    gender: z.enum(["male", "female"], { required_error: "Veuillez choisir le genre" }),
    photo: z
        .any()
        .refine((file) => file?.length > 0, "La photo est requise"),
    class_id: z.string().min(1, "Veuillez choisir la classe"),
    birth_date: z.string().min(1, "Veuillez choisir la date de naissance"),
});

const StudentsList = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
    });
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetch(`/students?page=${page}`);
    const lastPage = data?.last_page || 1;
    const { data: classesList, } = useFetch("/classes");

    const columns = [
        {
            header: "Info",
            accessor: "info",
        },
        {
            header: "CEF",
            accessor: "studentId",
            className: "hidden md:table-cell",
        },
        {
            header: "Group",
            accessor: "class",
            className: "hidden md:table-cell",
        },
        {
            header: "Niveu",
            accessor: "grade",
            className: "hidden md:table-cell",
        },
        {
            header: "Filière",
            accessor: "grade",
            className: "hidden md:table-cell",
        },
        {
            header: "Phone",
            accessor: "phone",
            className: "hidden lg:table-cell",
        },
        {
            header: "Address",
            accessor: "address",
            className: "hidden lg:table-cell",
        },
        {
            header: "Actions",
            accessor: "action",
        },
    ];
    const renderRow = (item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-sky/10 text-gray-600 text-sm">
            <td className="px-4 py-2 flex items-center space-x-2">
                <img
                    src={item.photo ? `${import.meta.env.VITE_APP_BACKEND}/storage/${item.photo}` : "/T_avatar.png"}
                    className="w-8 h-8 border-2 border-gray-400 rounded-full object-cover"
                    alt={item?.name}
                />
                <div>
                    <h1 className="flex space-x-3  ">{item?.nom} {item?.prenom}</h1>
                    <h2 className="text-gray-400 ">{item?.user?.email}</h2>
                </div>
            </td>
            <td className=" py-2 hidden md:table-cell">{item?.cef}</td>
            <td className=" py-2 hidden md:table-cell">{item?.class?.name}</td>
            <td className=" py-2 hidden md:table-cell">
                {item?.class?.niveu == 1 ? (
                    <span>1ére Année</span>
                ) : (
                    <span>2éme Année</span>
                )}

            </td>
            <td className=" py-2 hidden md:table-cell">{item?.class?.filier}</td>
            <td className=" py-2 hidden lg:table-cell">{item?.phone}</td>
            <td className=" py-2 hidden lg:table-cell">{item?.user?.address || "Rabat"}</td>
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
                                    handleDelete('students', item.id)
                                    queryClient.invalidateQueries(["/students"]);
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


    useEffect(() => {
        if (successAlert) {
            const timer = setTimeout(() => {
                setSuccessAlert(false);
            }, 4000); // 4 ثواني

            // Cleanup
            return () => clearTimeout(timer);
        }
    }, [successAlert]);


    // -----------------------------------------
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("nom", data.nom);
            formData.append("prenom", data.prenom);
            formData.append("phone", data.phone);
            formData.append("photo", data.photo[0]);
            formData.append("gender", data.gender);
            formData.append("email", data.email);
            formData.append("birth_date", data.birth_date);
            formData.append("address", data.address);
            formData.append("class_id", data.class_id);
            await CostumAxios.post("/students", formData);
            reset();
            queryClient.invalidateQueries(["/students"]);
            setDialogOpen(false); // Close dialog
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="w-full  min-h-screen bg-white p-4 rounded-lg ">
            {successAlert &&
                <Alert>
                    <CheckCircle2Icon color="green" />
                    <AlertTitle>
                        This Alert has a title and an icon. No description.
                    </AlertTitle>
                </Alert>
            }
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="hidden md:block text-xl">La List Des Stagiaires</h1>

                <div className="flex space-x-2">
                    <SearchBox />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                className="cursor-pointer py-4.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-md h-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-101"
                            >
                                <span className="hidden sm:inline">Ajouter Un Stagiaire</span>
                                <UserPlus size={20} color="white" className="mr-2" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Add New Student</DialogTitle>
                                <DialogDescription>Fill in the details to add a new student.</DialogDescription>
                            </DialogHeader>

                            {error && (
                                <div className="px-4 py-1 bg-red-50 border border-red-200 rounded-2xl">
                                    <p className="text-red-600 text-center text-sm">{error}</p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4  mt-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="">
                                        <Label htmlFor="nom">
                                            <User size={16} className="-mr-1 text-purple-500" />
                                            Nom
                                        </Label>
                                        <Input id="name" {...register("nom")} placeholder="Enter full name" />
                                        {errors.nom && <p className="text-red-500 text-xs">{errors.nom.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="name">
                                            <User size={16} className="-mr-1 text-purple-500" />
                                            prenom
                                        </Label>
                                        <Input id="name" {...register("prenom")} placeholder="Enter full name" />
                                        {errors.prenom && <p className="text-red-500 text-xs">{errors.prenom.message}</p>}
                                    </div>

                                </div>
                                <div className="">
                                    <Label htmlFor="email">
                                        <Mail size={16} className="-mr-1 text-purple-500" />
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                </div>


                                <div className="flex items-center gap-4">
                                    <div className="">
                                        <Label htmlFor="gender">
                                            <VenusAndMars size={16} className="-mr-1 text-purple-500" />
                                            Gender
                                        </Label>
                                        <Select onValueChange={(value) => setValue("gender", value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="phone">
                                            <Phone size={16} className="-mr-1 text-purple-500" />
                                            Phone
                                        </Label>
                                        <Input type="number" id="phone" {...register("phone")} className="col-span-3"
                                            placeholder="Enter phone number"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="">
                                        <Label htmlFor="email">
                                            <Mail size={16} className="-mr-1 text-purple-500" />
                                            Class Name
                                        </Label>
                                        <Select onValueChange={(value) => setValue("class_id", value)}>
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
                                        {errors.class_id && <p className="text-red-500 text-xs">{errors.class_id.message}</p>}
                                    </div>
                                    <div className="">
                                        <Label htmlFor="email">
                                            <Mail size={16} className="-mr-1 text-purple-500" />
                                            Birth day
                                        </Label>
                                        <Input type="date" id="email" {...register("birth_date")} className="col-span-3" />
                                        {errors.birth_date && <p className="text-red-500 text-xs">{errors.birth_date.message}</p>}
                                    </div>
                                </div>

                                <div className="">
                                    <Label htmlFor="email">
                                        <Mail size={16} className="-mr-1 text-purple-500" />
                                        Adresse
                                    </Label>
                                    <Input id="address" {...register("address")} className="col-span-3"
                                        placeholder="Enter Address"
                                    />
                                    {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                                </div>


                                <div className="">
                                    <Label htmlFor="photo">
                                        <Upload size={16} className="-mr-1 text-purple-500" />
                                        Profile Photo
                                    </Label>
                                    <Input type="file" id="photo" {...register("photo")} className="col-span-3" />
                                    {errors.photo && <p className="text-red-500 text-xs">{errors.photo.message}</p>}
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
        </div >
    );
};

export default StudentsList;