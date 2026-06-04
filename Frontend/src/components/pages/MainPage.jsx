import React from 'react'
import Navbar from '../Navbar'
import Skeleton from './Utility-Skeleton/Skeleton'
import CourseCard from '../CourseCard'
import { useFetchCoursesQuery } from '../apis/courseApi'
import { Link } from 'react-router-dom'

const MainPage = () => {

    const { status, error, data } = useFetchCoursesQuery()


    return (
        <div>

            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button type="button" command="--toggle" commandfor="mobile-menu" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open main menu</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 in-aria-expanded:hidden">
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 not-in-aria-expanded:hidden">
                                <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex shrink-0 items-center">
                            <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="h-8 w-auto" />
                        </div>
                        <div class="hidden sm:ml-6 sm:block">

                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0  gap-4">



                         <Link to={"/auth/register"} className='text-black  font-medium'>Register </Link>
                        <Link to={"/auth"} className='text-100 font-medium'>Login </Link>



                    </div>
                </div>
            </div>







            <div className='w-full flex flex-col gap-4 my-8 mx-16'>
                <p className='text-md text-slate-500 font-semibold'>Learn at your pace</p>
                <h1 className='text-5xl font-semibold'>Explore practical courses</h1>
                <p className='text-md text-slate-500 font-medium'>Browse courses, enroll as a student, or create curriculum as an instructor.</p>
                <input type="text"
                    placeholder='Search course...'
                    className='w-1/3 bg-slate-200 focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-slate-400 p-2 rounded-2xl border-none outline-none' />

                <div className='flex gap-4 flex-wrap'>
                    {
                        status === "loading" && <Skeleton />
                    }

                    {
                        status == "fulfilled" && data.Data.courses.map((course) => <CourseCard key={course._id} course={course}></CourseCard>)
                    }
                    {
                        status == "error" && console.log(error)
                    }

                </div>

            </div>



        </div>
    )
}

export default MainPage