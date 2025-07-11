// AttendancePage.jsx
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFetch } from "@/api/fetching";
import CostumAxios from "@/api/axios";
import { Input } from "@/components/ui/input";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import MyAttendancePDF from "@/components/MyAttendancePDF";

export default function AttendancePage() {
    const { data: pollsList } = useFetch("/polls");
    const [classesList, SetclassesList] = useState()
    const [lessonsList, SetlessonsList] = useState()
    const [selectedClass, SetselectedClass] = useState()
    const [selectedLesson, setSelectedLesson] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [attendance, setAttendance] = useState({})
    // const [Absance, setAbsance] = useState({})
    const [openConfirm, setOpenConfirm] = useState(false);


    const handelClassList = async (id) => {
        const { data: classesList } = await CostumAxios(`/poll/${id}/classes`);
        SetclassesList(classesList.classes)
    }
    // -----------------------------------------

    const handelStudents = async (id) => {
        const { data: classe } = await CostumAxios(`/classes/${id}`);
        const { data: lessonsList } = await CostumAxios(`/classes/${id}/lessons`);
        SetlessonsList(lessonsList.classData.lessons)
        SetselectedClass(classe)
    }
    // -----------------------------------------



    const handleStatusChange = (studentId, status) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }))
    }

    const handleSubmit = async () => {
        // const records = Object.entries(attendance).map(([studentId, status]) => ({
        //     studentId,
        //     status,
        // }))
        // const today = new Date().toISOString().split('T')[0];
        // const Adata = {
        //     class_id: selectedClass.id,
        //     lesson_id: selectedLesson,
        //     teacher_id: 2,
        //     date: today,
        //     time: selectedDate,
        //     absent_students: records
        // }
        // setAbsance(Adata)
        setOpenConfirm(true);
        // console.log(Adata)
        // await CostumAxios.post("/absences", Adata);
        // setAttendance({})
    }
    // ------------------------
    const confirmSubmit = async () => {
        const records = Object.entries(attendance).map(([studentId, status]) => ({
            studentId,
            status,
        }));
        const today = new Date().toISOString().split('T')[0];
        const Adata = {
            class_id: selectedClass.id,
            lesson_id: selectedLesson,
            teacher_id: 2,
            date: today,
            time: selectedDate,
            absent_students: records
        };

        try {
            await CostumAxios.post("/absences", Adata);
            setAttendance({});
            SetselectedClass()
            setOpenConfirm(false);
            alert("Attendance submitted successfully!");
        } catch (error) {
            alert("Error submitting attendance.", error);
        }
    };

    return (
        <div className="p-6 w-full bg-white rounded-md min-h-screen">

            <h1 className="hidden md:block text-xl">Attendance </h1>
            <div className="flex items-center justify-between gap-4 my-6">
                <div className="flex space-x-3">
                    <Select onValueChange={(v) => handelClassList(v)} disabled={!pollsList}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Poll" />
                        </SelectTrigger>
                        <SelectContent>
                            {pollsList?.map(cls => (
                                <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(v) => handelStudents(v)} disabled={!classesList}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                            {classesList?.map(cls => (
                                <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setSelectedLesson} disabled={!lessonsList}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="lesson" />
                        </SelectTrigger>
                        <SelectContent>
                            {lessonsList?.map(sub => (
                                <SelectItem key={sub.id} value={sub.id}>{sub.subject.code}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setSelectedDate} disabled={!selectedLesson}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Seance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'08:30-11:00'}>08:30 TO 11:00</SelectItem>
                            <SelectItem value={'11:00-13:30'}>11:00 TO 13:30</SelectItem>
                            <SelectItem value={'13:30-16:00'}>13:30 TO 16:00</SelectItem>
                            <SelectItem value={'16:00-18:30'}>16:00 TO 18:30</SelectItem>

                        </SelectContent>
                    </Select>
                </div>
                <Input variant='outline' disabled className={'w-fit bg-primary   '} value={`Today : ${new Date().toISOString().split('T')[0]}`} />
            </div>
            {/*  */}
            <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Confirmation</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>

                    <div
                        className="max-h-[75vh] overflow-y-auto my-4 bg-white text-black "
                    >
                        {Object.entries(attendance).map(([studentId, status], i) => {
                            const student = selectedClass.students.find(s => s.id == studentId);
                            return (
                                <div
                                    key={studentId}
                                    className="flex items-center justify-between border border-gray-300 p-2 rounded-md my-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold">{i + 1}.</span>

                                        <div className="flex flex-col">
                                            <span className="font-semibold">{student.nom} {student.prenom}</span>
                                            <span className="text-sm text-gray-600">{student.cef}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white font-medium ${status === "P" ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        >
                                            {status}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <DialogFooter className="flex justify-end gap-4">
{/*                     
                        <PDFDownloadLink
                            document={
                                <MyAttendancePDF
                                    attendance={attendance}
                                    students={selectedClass?.students || []}
                                    className={selectedClass?.name || "—"}
                                />
                            }
                            fileName={`absence_${selectedClass?.name || 'class'}_${new Date().toISOString().split('T')[0]}.pdf`}
                        >
                            {({ loading }) =>
                                loading ? "جاري توليد الملف..." : <Button variant="secondary">Download PDF</Button>
                            }
                        </PDFDownloadLink> */}
                        <Button variant="outline" onClick={() => setOpenConfirm(false)}>Cancel</Button>
                        <Button onClick={confirmSubmit}>Confirm & Submit</Button>




                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/*  */}
            <div className="space-y-2 w-full">
                {selectedClass && selectedLesson && selectedDate && selectedClass?.students.map((student, i) => (
                    <div
                        key={student.id}
                        className="flex items-center justify-between border border-primary p-2 rounded-md"
                    >
                        <div className="flex items-center gap-3">
                            {i + 1}
                            <img
                                src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`}
                                alt={student.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-600">{student.prenom} {student.nom}</span>
                                <span className="text-sm text-gray-500">{student?.cef}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant={attendance[student.id] === "P" ? "default" : "outline"}
                                onClick={() => handleStatusChange(student.id, "P")}
                                className={attendance[student.id] === "P" ? "bg-green-400 p-2 hover:bg-green-500 rounded-full" : "outline p-2 border border-gray-300"}
                            >
                                P
                            </Button>
                            <Button
                                type="button"
                                variant={attendance[student.id] === "A" ? "default" : "outline"}
                                onClick={() => handleStatusChange(student.id, "A")}
                                className={attendance[student.id] === "A" ? "bg-red-400 p-2 hover:bg-red-500 rounded-full" : "outline p-2 border border-gray-300"}
                            >
                                A
                            </Button>

                        </div>
                    </div>
                ))}
            </div>
            {selectedClass && selectedLesson && selectedDate && <Button onClick={handleSubmit} className="w-full mt-4">
                Submit Attendance
            </Button>}
        </div>
    )
}
