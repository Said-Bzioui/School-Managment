import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { useFetch } from '../api/fetching';
import { Skeleton } from './ui/skeleton';


export function GanderChart() {
    const { data, isLoading, error } = useFetch("/Students_Gender");



    const genderCount = (count) => {
        if (!count || data?.total === 0) {
            return 0;
        }
        return Math.round((count / data?.total) * 100)
    }

    const StudentsData = [
        {
            name: 'Total',
            percentage: 100,
            fill: 'white',
        },
        {
            name: 'Girls',
            percentage: genderCount(data?.females),
            fill: '#f4a7ff',
        },
        {
            name: 'Boys',
            percentage: genderCount(data?.males),
            fill: '#bdddff',
        },

    ];


    if (isLoading) {
        return (
                <div className="bg-white w-full h-96 md:w-96 rounded-lg p-2 ">
                    <Skeleton className="h-4 w-[100px]" />
                    <div className='relative  w-full h-[68%] flex items-center justify-center'>
                            <Skeleton className="h-[120px] w-[120px] rounded-full" />
                    </div>
                    <div className=" flex items-center justify-evenly">
                        <div className=" w-fit flex flex-col items-center justify-center space-y-3 ">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-[60px]" />
                        </div>
                        <div className=" w-fit flex flex-col items-center justify-center  space-y-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-[60px]" />
                        </div>
                    </div>
                </div>

        );
    }
    if (error) {
        return (
            <div className="bg-white w-full h-96 md:w-96 rounded-lg p-2 flex justify-center items-center">
                <p className="text-red-500 text-[15px] text-center ">Cnnot get Teachers ! Please try again later.</p>
            </div>

        );
    }

    return (

        <div className="bg-white w-full h-96 md:w-96 rounded-lg p-2 ">
            <h1 className=" text-lg">Students</h1>
            <div className='relative  w-full h-[68%]'>
                <ResponsiveContainer >
                    <RadialBarChart cx="50%" cy="50%" innerRadius="50%" outerRadius="100%" barSize={20} RadialBar={20} data={StudentsData}>
                        <RadialBar
                            background
                            dataKey="percentage"
                        />
                    </RadialBarChart>

                </ResponsiveContainer>
                <img src="./maleFemale.png" className='absolute w-12 left-[50%] top-[50%] -translate-[50%]     ' />

            </div>
            <div className=" flex items-center justify-evenly">
                <div className=" w-fit flex flex-col items-center justify-center ">
                    <div className='bg-[#bdddff] w-5 h-5 rounded-full' />
                    <h1 className=' font-bold'>{data?.males}</h1>
                    <h2 className='text-sm text-gray-300  '>Boys({genderCount(data?.males)}%)</h2>
                </div>
                <div className=" w-fit flex flex-col items-center justify-center ">
                    <div className='bg-[#f4a7ff] w-5 h-5 rounded-full' />
                    <h1 className=' font-bold'>{data?.females}</h1>
                    <h2 className='text-sm text-gray-300  '>Girls({genderCount(data?.females)}%)</h2>
                </div>
            </div>

        </div>
    );
}


