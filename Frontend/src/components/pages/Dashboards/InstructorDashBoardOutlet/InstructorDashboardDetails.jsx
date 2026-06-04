import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useFetchCoursesQuery } from '../../../apis/courseApi';
import { isUserCourseOwner } from '../../../utils/utils.js';
import CourseCard from '../../../CourseCard.jsx';
import { CreatedCourseDetails, EnrollementCourseDetails } from '../../../DashboardCard/Card.jsx';

const InstructorDashboardDetails = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, error, isLoading } = useFetchCoursesQuery();
    const courses=data?.Data?.courses||[];
    console.log(courses);
    const instructorCourses = courses?.filter((course) => isUserCourseOwner(course, user));
     console.log(instructorCourses);
    const totalStudents = instructorCourses?.reduce((total, course) => total + (course.totalStudents || 0), 0);
    const trendingCourse = instructorCourses?.reduce((topCourse, course) => {
        if (!topCourse || (course.totalStudents || 0) > (topCourse.totalStudents || 0)) return course;
        return topCourse;
    }, null);

    
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl font-semibold'>Instructor dashboard</h1>
                <p className='text-slate-500'>Review created courses and total student counts.</p>
            </div>
            <div className='flex flex-wrap gap-1'>
                <div className='flex flex-col shadow-md w-3xs p-4 rounded-xl border border-gray-300'>
                    <p className='text-slate-500'>Created courses</p>
                    <h1 className='text-3xl font-semibold'>{instructorCourses.length}</h1>
                </div>
                <div className='flex flex-col shadow-md w-3xs p-4 rounded-xl border border-gray-300'>
                    <p className='text-slate-500'>Total students</p>
                    <h1 className='text-3xl font-semibold'>{totalStudents}</h1>
                </div>
                <div className='flex flex-col shadow-md w-3xs p-4 rounded-xl border border-gray-300'>
                    <p className='text-slate-500'>Trending course</p>
                    <h1 className='text font-semibold'>{trendingCourse?.title || "No courses yet"}</h1>
                </div>
            </div>
            <div className='flex flex-col gap-8 border border-gray-300 p-4 rounded-2xl'>
                <div className='flex flex-col gap-1'>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>Your courses</p>
                        {/* <NavLink className="underline">Manage all</NavLink> */}
                    </div>

                    {/* <p className='text-slate-500'>Manage course details and add lectures.</p> */}
                </div>
                <div className='flex flex-wrap gap-2 flex-col border border-gray-300 p-4 rounded-xl '>
                    {instructorCourses.length<1?
                        "No courses are found!"
                        :
                        instructorCourses.map((course)=>(
                            <CreatedCourseDetails course={course}/>
                        ))    
                }
                </div>
            </div>
        </div>
    )
}

export default InstructorDashboardDetails