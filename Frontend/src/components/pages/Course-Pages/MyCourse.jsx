import React, { useEffect } from 'react'
import Navbar from '../../Navbar.jsx'
import { NavLink } from 'react-router-dom'
import MyCourseCard from '../../Card/MyCourseCard.jsx'
import { useGetMyEnrollmentQuery ,useGetEnrollmentByCourseQuery} from '../../apis/enrollmentApi.js'
import Skeleton from '../Utility-Skeleton/Skeleton.jsx'
import StudentSidebar from '../../sidebar/StudentSidebar.jsx'
import InstructorSidebar from '../../sidebar/InstructorSidebar.jsx'
import { useSelector } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'

const MyCourse = () => {

    const user = useSelector((state) => state.auth.user);
    const { data, error, isLoading } = useGetMyEnrollmentQuery(
        undefined, {
        refetchOnMountOrArgChange: true,
    }
    );


    

    useEffect(() => {
        if (data) {
            console.log(data)
            toast.success("Successfully fetched your courses!");
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error("Something went wrong!");
        }
    }, [error]);
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <Navbar />

            <div className="flex flex-col md:flex-row gap-4 pt-8 px-4 w-full">

                {/* Sidebar - Hidden on mobile */}
                <div className="hidden md:block">
                    {user.role === "student" ? (
                        <StudentSidebar />
                    ) : (
                        <InstructorSidebar />
                    )}
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1 gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">My Courses</h1>
                        <p className="text-slate-500">
                            View courses you are enrolled in.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
                        {isLoading ? (
                            <div className='flex flex-col gap-4 w-screen h-screen'>
                                <div className='flex'>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </div>
                                <div className='flex'>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </div>
                            </div>
                        ) : error ? (
                            <p>Something went wrong!</p>
                        ) : data?.Data?.enrollment?.length > 0 ? (
                            data.Data.enrollment.map((item) => (
                                <MyCourseCard
                                    key={item._id}
                                    enrollment={item}
                                />
                            ))
                        ) : (
                            <p>No courses are found!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCourse