import React, { useMemo, useState } from 'react'
import Navbar from '../Navbar'
import Skeleton from './Utility-Skeleton/Skeleton'
import CourseCard from '../CourseCard'
import { useFetchCoursesQuery } from '../apis/courseApi'

const MainPage = () => {

    const { status, error, data } = useFetchCoursesQuery();

    const [searchTerm, setSearchTerm] = useState("");

    // FIX: use correct data source
    const allCourses = useMemo(() => {
        return data?.Data?.courses || [];
    }, [data]);

    const filteredCourses = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return allCourses;

        return allCourses.filter((course) => {
            const instructor = typeof course.instructor === "object" ? course.instructor : {};
            const instructorName = `${instructor.firstName || ""} ${instructor.lastName || ""} ${instructor.email || ""}`;

            return `${course.title || ""} ${course.description || ""} ${instructorName}`
                .toLowerCase()
                .includes(term);
        });
    }, [allCourses, searchTerm]);

    return (
        <div className='overflow-hidden'>
            <Navbar />

            <div className='w-full flex flex-col gap-4 my-8 mx-16 p-2'>

                <p className='text-md text-slate-500 font-semibold'>Learn at your pace</p>

                <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold'>
                    Explore practical courses
                </h1>

                <p className='text-sm sm:text-base text-slate-500 font-medium'>
                    Browse courses, enroll as a student, or create curriculum as an instructor.
                </p>

                {/* SEARCH INPUT */}
                <input
                    type="text"
                    placeholder='Search course...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-1/3 bg-slate-200 focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-slate-400 p-2 rounded-2xl border-none outline-none'
                />

                <div className='flex gap-4 flex-wrap'>

                    {/* LOADING */}
                    {status === "loading" && <Skeleton />}

                    {/* ERROR */}
                    {status === "error" && (
                        <p className="text-red-500">{error?.message || "Error loading courses"}</p>
                    )}

                    {/* DATA (WITH SEARCH) */}
                    {status === "fulfilled" &&
                        filteredCourses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default MainPage