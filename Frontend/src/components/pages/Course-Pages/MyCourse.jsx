import React, { useEffect } from 'react'
import Navbar from '../../Navbar.jsx'
import { NavLink } from 'react-router-dom'
import CourseCard from '../../CourseCard.jsx'
import { useGetMyEnrollmentQuery } from '../../apis/enrollmentApi.js'
import Skeleton from '../Utility-Skeleton/Skeleton.jsx'
import StudentSidebar from '../../sidebar/StudentSidebar.jsx'
import InstructorSidebar from '../../sidebar/InstructorSidebar.jsx'
import { useSelector } from 'react-redux'
import { Toaster,toast } from 'react-hot-toast'

const MyCourse = () => {

    const user = useSelector((state) => state.auth.user);
    const { data, error, isLoading } = useGetMyEnrollmentQuery(
        undefined, {
        refetchOnMountOrArgChange: true,
    }
    );
   if(data){
    toast.success("Successfully fetched your courses!");
   }

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Navbar />
            <div className='flex flex-wrap gap-4 pt-8 pl-4'>
                {
                    user.role === "student" ?
                        <StudentSidebar /> :
                        <InstructorSidebar />
                }

                <div className='pl-2 flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-semibold'>My courses</h1>
                        <p className='text-slate-500'>View courses you are enrolled in.</p>
                    </div>
                    <div className='flex flex-wrap gap-4 w-full '>
                        {isLoading ? (<Skeleton></Skeleton>) :
                            error ? (<p>Something went wrong!</p>) :
                                data?.Data?.enrollment?.length > 0 ? (data?.Data?.enrollment.map((item) => <CourseCard key={item._id} course={item.course} myCourse={true} progress={item.progress}></CourseCard>)) : <p>No courses are found!</p>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default MyCourse