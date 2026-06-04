import React from 'react'
import Navbar from '../Navbar'
import Skeleton from './Utility-Skeleton/Skeleton'
import CourseCard from '../CourseCard'
import { useFetchCoursesQuery } from '../apis/courseApi'

const MainPage = () => {

    const {status,error,data}=useFetchCoursesQuery()


    return (
        <div>
            <Navbar />
            <div className='w-full flex flex-col gap-4 my-8 mx-16'>
                <p className='text-md text-slate-500 font-semibold'>Learn at your pace</p>
                <h1 className='text-5xl font-semibold'>Explore practical courses</h1>
                <p className='text-md text-slate-500 font-medium'>Browse courses, enroll as a student, or create curriculum as an instructor.</p>
                <input type="text"
                    placeholder='Search course...'
                    className='w-1/3 bg-slate-200 focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-slate-400 p-2 rounded-2xl border-none outline-none' />

                <div className='flex gap-4 flex-wrap'>
                    {
                        status==="loading" && <Skeleton/>
                    }

                    {
                        status=="fulfilled" && data.Data.courses.map((course)=><CourseCard key={course._id} course={course}></CourseCard>)
                    }
                    {
                         status=="error" && console.log(error)
                    }
        
                </div>

            </div>



        </div>
    )
}

export default MainPage