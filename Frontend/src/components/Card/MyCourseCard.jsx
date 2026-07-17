import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useFetchCourseByIdQuery } from './apis/courseApi';
// import CourseDetails from './pages/Course-Pages/CourseDetails';

const MyCourseCard = ({ enrollment }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col w-72 shadow-lg border border-gray-300 gap-2 rounded-2xl p-1' >
            <div className='w-full h-2/3'>
                <img
                    className='rounded-2xl w-48 h-48 object-contain mx-auto  p-4'
                    src={enrollment.course.thumbnail.url} alt="course-thumbnail" />
            </div>

            <div className='flex flex-col  mx-4'>
                <div className='flex  flex-wrap justify-between'>
                    <h3 className=' font-semibold '>{enrollment.course.title.slice(0, 15) + "..."}</h3>
                    <button className='bg-black text-amber-50 px-4 rounded-xl text-sm'>Featured</button>
                </div>
                <div className='flex flex-col '>
                    <p className='text-slate-500'>Instructor:{enrollment.course.instructor.firstName} </p>
                    <p className='text-slate-500'>{enrollment.course.description}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-6/7 px-4">
                <div className="flex justify-between">
                    <p className='font-semibold'>progress</p>
                    <p className="text-slate-500">{enrollment.progress}%</p>
                </div>
                <div className="w-full h-2">
                    <div className="h-2 bg-black rounded-xl" style={{ width: `${Math.max(enrollment.progress, 2)}%` }}></div>
                </div>
                <button className='bg-slate-700 text-amber-50 w-3/4 mx-8 rounded-2xl p-1 my-2' onClick={() => navigate(`/course-play/${enrollment.course._id}`)}>Continue Learning</button>
            </div>




        </div>
    )
}

export default MyCourseCard