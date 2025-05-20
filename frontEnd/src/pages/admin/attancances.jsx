"use client"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

const students = [
    { name: "Amanda Kherr", letter: "A", status: "P" },
    { name: "Angel Johnson", letter: "A", status: "P" },
    { name: "Austin Kherr", letter: "A", status: "A" },
    { name: "Baba Kherr", letter: "B", status: "L" },
]

const statusColors = {
    P: "bg-green-500",
    A: "bg-red-500",
    L: "bg-yellow-400",
}

export default function AttendancePage() {
    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1A">1A</SelectItem>
                        <SelectItem value="1B">1B</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="math">Math</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                    </SelectContent>
                </Select>

                <Button className="bg-blue-600 text-white">Take Attendance</Button>

                <div className="ml-auto text-sm text-gray-500 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Today 09 Dec 2019
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                {["A", "B"].map(letter => (
                    <div key={letter}>
                        <div className="px-6 py-2 bg-gray-100 font-semibold text-gray-700">{letter}</div>
                        {students
                            .filter(s => s.letter === letter)
                            .map((student, idx) => (
                                <div key={idx} className="flex items-center justify-between px-6 py-3 border-b">
                                    <div className="text-gray-800 font-medium">{student.name}</div>
                                    <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${statusColors[student.status]}`}>
                                        {student.status}
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
