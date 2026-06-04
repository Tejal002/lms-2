import { NavLink } from "react-router-dom"



export function EnrollementDetails({ name, value }) {
    return (
        <div className='flex flex-col shadow-md w-3xs p-4 rounded-xl border border-gray-300'>
            <p className='text-slate-500'>{name}</p>
            <h1 className='text-3xl font-semibold'>{value}</h1>
        </div>
    )

}

export function EnrollementCourseDetails({ item }) {

    return (
        <div className='flex flex-col border border-gray-300 p-4 rounded-xl'>
            <div className='flex justify-between'>
                <p className='font-semibold'>{item?.course?.title}</p>
                <button className='bg-black text-amber-50 px-2 p-1 rounded-2xl font-semibold'>Continue</button>
            </div>

            <div className="flex flex-col gap-2 w-6/7">
                <div className="flex justify-between">
                    <p className='font-semibold'>progress</p>
                    <p className="text-slate-500">100%</p>
                </div>

                <div className="w-full h-2">
                    <div className="h-2 bg-black rounded-xl" style={{ width: `${Math.max(item?.progress || 0, 2)}%` }}></div>
                </div>
            </div>
        </div>
    )

}


export function CreatedCourseDetails({ course }) {

    return (
        <div className="flex flex-col w-full flex-wrap">
            <div className='flex flex-col gap-2 flex-wrap w-full border border-gray-300 p-4 rounded-xl'>
                <div className='flex justify-between'>
                    <p className='font-semibold'>{course?.title}</p>

                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between">
                        <p className="text-slate-500">{course.totalStudents || 0} students</p>
                        <p className="text-slate-500">{course.lectures.length || 0} lectures</p>
                    </div>
                   
                </div>

            </div>
        </div>
    )

}