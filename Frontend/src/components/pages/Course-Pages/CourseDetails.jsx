import React from 'react'
import Navbar from '../../Navbar.jsx'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useFetchCourseByIdQuery } from '../../apis/courseApi.js';
import Skeleton from '../../pages/Utility-Skeleton/Skeleton.jsx';
import { useCreateEnrollmentMutation } from '../../apis/enrollmentApi.js';
import { useDispatch } from 'react-redux';
import { Toaster, toast } from "react-hot-toast"
import LectureTable from './LectureTable.jsx';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  console.log(courseId);

  const { data, error, loading } = useFetchCourseByIdQuery(courseId);
  const [createEnroll, result] = useCreateEnrollmentMutation();


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
        loading ? (<Skeleton></Skeleton>) :
          error ? (<p>Something went wrong!</p>) :
            data ?
              <div>
                <div className='flex m-8 p-2 gap-4'>
                  <div className='w-3/4 '>
                    <div className='flex flex-col bg-gray-200 w-full items-start gap-2 p-8 rounded-3xl'>
                      <h3 className='text-3xl font-semibold'>{data.Data.course.title}</h3>
                      <p className='text-gray-500'>{data.Data.course.description}</p>
                      <p className='font-semibold'>Created by: {data.Data.course.instructor.firstName} {data.Data.course.instructor.lastName}</p>
                      <p className='font-semibold'>Total Students: {data.Data.course.totalStudents}</p>
                    </div>
                    <div className='flex flex-col w-full items-start gap-2 p-8 rounded-3xl'>
                      <h3 className='font-semibold text-2xl'>Course Content</h3>
                      <div className=' w-full'>
                        <LectureTable lecture={data.Data.course.lectures||[]}/>
                      </div>
                    </div>
                  </div>


                  <div className='shadow-md p-4 rounded-2xl border border-slate-300' >
                    <div className='flex flex-col gap-2 items-center'>
                      <h4 className='font-semibold text-xl text-left'>Start Learning</h4>
                      <p className='text-slate-400'>Enroll to unlock the full lecture player and progress tracking</p>
                      <button className='bg-black rounded-2xl text-white p-2 w-3/4' onClick={() => handleEnroll(data?.Data?.course?._id)} >{result.isLoading ? "Enrolling" : "Enroll now"}</button>
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