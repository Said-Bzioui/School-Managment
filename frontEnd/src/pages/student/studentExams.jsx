
import ExamsCalendar from "@/components/examsCalendar";

const StudentExams = () => {

    return (
        <div className="bg-white  p-5 min-h-screen w-full flex flex-col ">
            <h1 className="text-xl font-bold  mb-10 text-gray-600   ">My Exams</h1>
            <div className="h-[650px] w-full">
                <ExamsCalendar />
            </div>
        </div>
    );
};

export default StudentExams;
