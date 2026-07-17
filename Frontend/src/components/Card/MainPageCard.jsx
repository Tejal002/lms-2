import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetchCourseByIdQuery } from '../apis/courseApi.js';
import CourseDetails from '../pages/Course-Pages/CourseDetails';


const MainPageCard = ({course}) => {



  
  const navigate=useNavigate();
  return (
    <div className='flex flex-col min-w-75  w-2/7 shadow-lg border border-gray-300 gap-2 rounded-2xl p-1' >
        <div className='w-full h-2/3'>
            <img 
            className='rounded-2xl w-48 h-48 object-contain mx-auto shadow p-4'
            src={course.thumbnail.url} alt="course-thumbnail" />
        </div>
        
        <div className='flex flex-col  mx-4'>
            <div className='flex  flex-wrap justify-between'>
             <h3 className=' font-semibold '>{course.title.slice(0,15)+"..."}</h3>
             <button className='bg-black text-amber-50 px-2 rounded-xl text-sm'>Featured</button>
        </div>
        <div className='flex flex-col '>
            <p className='text-slate-500'>Instructor:{course.instructor.firstName} </p>
            <p className='text-slate-500'>{course.description}</p>
        </div>
        </div>
        
       <button className='bg-slate-700 text-amber-50 w-3/4 mx-8 rounded-2xl p-1 my-2' onClick={()=>navigate(`/course-details/${course._id}`)}>View Course</button>
        
        
       
    </div>
  )
}

export default MainPageCard