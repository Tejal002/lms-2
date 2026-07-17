import React from 'react'
import Navbar from '../../Navbar.jsx'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useFetchCourseByIdQuery } from '../../apis/courseApi.js';
import Skeleton from '../../pages/Utility-Skeleton/Skeleton.jsx';
import { useCreateEnrollmentMutation, useGetEnrollmentByCourseQuery } from '../../apis/enrollmentApi.js';
import { useDispatch } from 'react-redux';
import { Toaster, toast } from "react-hot-toast"
import LectureTable from './LectureTable.jsx';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  console.log(courseId);
  console.log(useGetEnrollmentByCourseQuery(courseId))

  const { data, isError, isLoading } = useFetchCourseByIdQuery(courseId);
  const { status } = useGetEnrollmentByCourseQuery(courseId);
  console.log(status)
  const [createEnroll, result] = useCreateEnrollmentMutation();
  console.log(data)
  console.log(isError)
  console.log(useFetchCourseByIdQuery(courseId))


  async function handleEnroll(id) {

    try {
      const result = await createEnroll(id).unwrap();
      console.log(result);
      if (result) {
        toast.success("successfully Enrolled to the course!");

        setTimeout(() => {
          navigate("/student-dashboard/my-course");
        }, 2000)

      }
    } catch (err) {
      console.log("error:", err);
      toast.error(err.data.Error.info);
    }
  }

  console.log(data?.Data?.course);

  return (

    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />
      {
        isLoading ? (<div className='flex flex-col gap-4 w-screen h-screen mt-8'>
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
        </div>) :
          isError ? (<p>Something went wrong!</p>) :
            data ?
              <div>
                <div className='flex m-8 p-2 gap-16 flex-wrap'>
                  <div className='w-3/5'>
                    <div className='flex flex-col bg-gray-200 w-full items-start gap-2 p-8 rounded-3xl'>
                      <h3 className='text-3xl font-semibold'>{data.Data.course.title}</h3>
                      <p className='text-gray-500'>{data.Data.course.description}</p>
                      <p className='font-semibold'>Created by: {data.Data.course.instructor.firstName} {data.Data.course.instructor.lastName}</p>
                      <p className='font-semibold'>Total Students: {data.Data.course.totalStudents}</p>
                    </div>
                    <div className='flex flex-col w-full items-start gap-2 py-8 rounded-3xl'>
                      <h3 className='font-semibold text-2xl'>Course Content</h3>
                      <div className='w-full'>
                        {
                          data.Data.course.lectures.length > 0 ? <LectureTable lecture={data.Data.course.lectures || []} /> : 'Instructor not uploaded content yet!'
                        }

                      </div>
                    </div>
                  </div>


                  <div className='shadow-md p-4 w-72 rounded-2xl border border-slate-300' >
                    <div className='flex flex-col gap-2 items-center'>
                      <h4 className='font-semibold text-xl text-left'>Start Learning</h4>
                      <p className='text-slate-400'>Enroll to unlock the full lecture player and progress tracking</p>
                      {
                        status == 'fulfilled' ? <button className='bg-black rounded-2xl text-white p-2 w-3/4'>Already Enrolled</button>
                          : <button className='bg-black rounded-2xl text-white p-2 w-3/4' onClick={() => handleEnroll(data?.Data?.course?._id)} >{result.isLoading ? "Enrolling" : "Enroll now"}</button>
                      }

                      <button className='bg-slate-400 rounded-2xl text-white p-2 w-3/4'>Preview player</button>
                    </div>
                  </div>
                </div>
              </div>
              : <p>Something went wrong!</p>
      }

    </div>
  )
}

export default CourseDetails