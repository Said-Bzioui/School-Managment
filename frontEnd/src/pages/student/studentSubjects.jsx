import { useFetch } from "@/api/fetching";
import SubjectCard from "@/components/subjects/subjectCard";
import { Skeleton } from "@/components/ui/skeleton";

const StudentSubjects = () => {

    const { class_id } = JSON.parse(localStorage.getItem("userData"));
    const { data, error, isLoading } = useFetch(`/classes/${class_id}/subjects`);

    if (error) return <div>Error loading subjects</div>;
    return (
        <div className="bg-white  p-5 min-h-screen w-full flex flex-col ">
            <h1 className="text-xl font-bold  mb-10 text-gray-600   ">My Subjects</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading && (
                Array(3).fill(0).map((_, index) => (
                    <div key={index} className="bg-gray-100/80 rounded-md p-2">
                        <div className="flex items-center justify-around gap-4">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                        <div className="flex flex-col my-3 space-y-2">
                            <Skeleton className="w-[90%] h-3" />
                            <Skeleton className="w-10 h-3" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mt-2 space-x-2">
                                <Skeleton value={50} className="w-[95%] h-2 bg-gray-200" />
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </div>
                        </div>
                    </div>
                )))}

                {data?.subjects.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                ))}
            </div>
        </div>
    );
};

export default StudentSubjects;
