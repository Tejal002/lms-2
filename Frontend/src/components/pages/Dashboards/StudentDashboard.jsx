import React from 'react'
import Navbar from '../../Navbar'
import { NavLink } from 'react-router-dom'
import { useGetMyEnrollmentQuery } from '../../apis/enrollmentApi.js'
import { EnrollementCourseDetails, EnrollementDetails } from "../../DashboardCard/Card.jsx"
import StudentSidebar from '../../sidebar/StudentSidebar.jsx'
import { useSelector } from 'react-redux'
import InstructorSidebar from '../../sidebar/InstructorSidebar.jsx'

const StudentDashboard = () => {

    const { data, error, isLoading } = useGetMyEnrollmentQuery();
    const user = useSelector((state) => state.auth.user);

    console.log(data?.Data?.enrollment);

    return (
        <div>
            <Navbar />
            <div className='flex flex-wrap gap-4 pt-8 pl-4'>
                {
                    user.role === "student" ?
                        <StudentSidebar /> :
                        <InstructorSidebar />
                }

                <div className='flex flex-col gap-8'>
                    <div>
                        <h1 className='text-2xl font-semibold'>Student dashboard</h1>
                        <p className='text-slate-500'>Track enrolled courses and progress percentages.</p>
                    </div>
                    <div className='flex flex-wrap gap-1'>
                        <EnrollementDetails name={"Enrolled"} value=
                            {
                                isLoading ? <p className='text-sm'>Loading....</p> :
                                    error ? <p className='text-sm'>Something went wrong!</p> :
                                        data ? data.Data.enrollment.length :
                                            null

                            } />
                        <EnrollementDetails name={"Average progress"} value={
                            isLoading ? <p className='text-sm'>Loading....</p> :
                                error ? <p className='text-sm'>Something went wrong!</p> :
                                    data ? (
                                        (
                                            data.Data.enrollment.reduce(
                                                (acc, curr) => acc + curr.progress,
                                                0
                                            ) / data.Data.enrollment.length
                                        ).toFixed(2)+"%"
                                    ) :
                                        null
                        } />
                        {/* yet-to complete */}
                        <EnrollementDetails name={"Completed"} value={data?.Data?.enrollment.reduce((acc,curr)=>acc+=curr.completedLectures.length,0)} />
                    </div>
                    <div className='flex flex-col gap-8 border border-gray-300 p-4 rounded-2xl'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex justify-between'>
                                <p className='font-semibold'>Recent courses</p>
                                <NavLink className="underline">View all</NavLink>
                            </div>

                            <p className='text-slate-500'>Pick up from your latest enrollments.</p>
                        </div>
                        {
                            isLoading ? (<p className='text-sm'>Loading....</p>) :
                                error ? (<p className='text-sm'>Something went wrong!</p>) :
                                    data?.Data?.enrollment?.length > 0 ?
                                        data.Data.enrollment.map((item) => <EnrollementCourseDetails key={item._id} item={item} />)
                                        : null

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard