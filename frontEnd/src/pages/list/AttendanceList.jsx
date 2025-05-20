// AttendancePage.jsx
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AttendancePage() {
    const [students, setStudents] = useState([])
    const [classes, setClasses] = useState([])
    const [subjects, setSubjects] = useState([])
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("")
    const [attendance, setAttendance] = useState({})

    // Fetch data from JSON Server (port 5000)
    useEffect(() => {
        fetch("http://localhost:5000/students").then(res => res.json()).then(data => setStudents(data))
        fetch("http://localhost:5000/classes").then(res => res.json()).then(data => setClasses(data))
        fetch("http://localhost:5000/subjects").then(res => res.json()).then(data => setSubjects(data))
    }, [])

    const handleStatusChange = (studentId, status) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }))
    }

    const handleSubmit = async () => {
        const records = Object.entries(attendance).map(([studentId, status]) => ({
            studentId,
            status,
            classId: selectedClass,
            subjectId: selectedSubject,
            teacherId: 2,
            date: new Date().toISOString().split("T")[0],
        }))
        for (const record of records) {
            await fetch("http://localhost:5000/attendances", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record),
            })
        }
        alert("Attendance submitted successfully")
        setAttendance({})
    }

    return (
        <div className="p-6 w-full bg-white">
            <div className="flex gap-4 mb-6">
                <Select onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                        {classes.map(cls => (
                            <SelectItem key={cls.id} value={cls.id.toString()}>{cls.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map(sub => (
                            <SelectItem key={sub.id} value={sub.id.toString()}>{sub.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button disabled={!selectedClass || !selectedSubject}>
                    Take Attendance
                </Button>
            </div>
            <div className="space-y-2 w-full">
                {students.map((student, i) => (
                    <>

                        <div
                            key={student.id}
                            className="flex items-center justify-between border p-2 rounded-md"
                        >
                            <div className="flex items-center gap-3">
                                {i}
                                <img
                                    src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`}
                                    alt={student.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <span>{student.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant={attendance[student.id] === "P" ? "default" : "outline"}
                                    onClick={() => handleStatusChange(student.id, "P")}
                                    className={attendance[student.id] === "P" ? "bg-green-400 hover:bg-green-500 rounded-full" : "outline"}
                                >
                                    P
                                </Button>
                                <Button
                                    type="button"
                                    variant={attendance[student.id] === "A" ? "default" : "outline"}
                                    onClick={() => handleStatusChange(student.id, "A")}
                                    className={attendance[student.id] === "A" ? "bg-red-400 hover:bg-red-500 rounded-full" : "outline"}
                                >
                                    A
                                </Button>

                            </div>
                        </div>
                    </>
                ))}
            </div>
            <Button onClick={handleSubmit} className="w-full mt-4">
                Submit Attendance
            </Button>
        </div>
    )
}
