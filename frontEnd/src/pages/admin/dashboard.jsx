import { DashCart } from "../../components/dashCart";
import { GanderChart } from "../../components/ganderChart";
import FinanceChart from "../../components/FinanceChart";
import EventCalendar from "../../components/EventCalendar";
import Announcements from "../../components/Announcements";
import { useFetch } from "../../api/fetching";
import { AttendancesChart } from "../../components/AttendanceChart";

export function Dashboard() {
    const { data, isLoading , error } = useFetch("/counting");




    return (
        <>
            {/* LEFT SIDE */}
            <div className="w-full  lg:w-4/6 space-y-4 ">
                <div className="flex flex-wrap items-center gap-3">
                    <DashCart label={"Teachers"} count={data?.teachers} isLoading={isLoading} error={error} />
                    <DashCart label={"Students"} count={data?.students} isLoading={isLoading} error={error}/>
                    <DashCart label={"Classes"} count={data?.classes} isLoading={isLoading} error={error}/>
                    <DashCart label={"chi7aja"} count={data?.students} isLoading={isLoading} error={error}/>
                </div>
                <div className="flex flex-col md:flex-row  items-center gap-4">
                    <GanderChart />
                    <AttendancesChart />
                </div>

                <FinanceChart />




            </div>
            {/* RIGHT SIDE */}
            <div className="w-full lg:w-2/6 flex flex-col md:flex-row  lg:flex-col space-y-4 md:space-y-0 md:gap-3">
                <EventCalendar />
                <Announcements />
            </div>
        </>
    )
}