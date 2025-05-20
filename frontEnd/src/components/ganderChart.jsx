import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { useFetch } from '../api/fetching';


export function GanderChart() {
    const { data, isLoading, error } = useFetch("/Students_Gender");
    if (isLoading) {
        return (

            <div className="bg-white animate-pulse w-full h-96 md:w-96 rounded-lg p-2 flex justify-center items-center">
                <div className=" animate-spin w-[20px] h-[20px] border-2 border-gray-100 border-t-blue-500 rounded-full"></div>
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



    const genderCount = (count) => {
        if (!count || data?.total === 0) {
            return 0;
        }
        return (count / data?.total) * 100
    }

    const StudentsData = [
        {
            name: 'Total',
            percentage: 100,
            fill: 'white',
        },
        {
            name: 'Girls',
            percentage: genderCount(data?.males),
            fill: '#D8CAF1',
        },
        {
            name: 'Boys',
            percentage: genderCount(data?.females),
            fill: '#C8E6F1',
        },

    ];

    return (

        <div className="bg-white w-full h-96 md:w-96 rounded-lg p-2 ">
            <h1 className=" text-xl">Students</h1>
            <div className='relative  w-full h-[68%]'>
                <ResponsiveContainer >
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={StudentsData}>
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
                    <div className='bg-sky w-5 h-5 rounded-full' />
                    <h1 className=' font-bold'>{data?.males}</h1>
                    <h2 className='text-sm text-gray-300  '>Boys({genderCount(data?.males)}%)</h2>
                </div>
                <div className=" w-fit flex flex-col items-center justify-center ">
                    <div className='bg-purpl w-5 h-5 rounded-full' />
                    <h1 className=' font-bold'>{data?.females}</h1>
                    <h2 className='text-sm text-gray-300  '>Girls({genderCount(data?.females)}%)</h2>
                </div>
            </div>

        </div>
    );
}


