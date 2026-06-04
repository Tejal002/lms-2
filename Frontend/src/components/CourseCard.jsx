import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetchCourseByIdQuery } from './apis/courseApi';
import CourseDetails from './pages/Course-Pages/CourseDetails';

const CourseCard = ({course,myCourse,progress}) => {

console.log(progress)

  
  
  const navigate=useNavigate();
  return (
    <div className='flex flex-col w-1/4 shadow-lg gap-4 rounded-2xl p-1' style={{width:myCourse?"300px":null}}>
        <div className='s w-full h-2/3'>
            <img 
            className='rounded-2xl h-full w-full'
            src={course.thumbnail.url} alt="course-thumbnail" />
        </div>
        
        <div className='flex justify-around'>
             <h3 className='text-xl font-semibold '>{course.title}</h3>
             <button className='bg-black text-amber-50 px-2 rounded-xl text-sm'>Featured</button>
        </div>
        <div className='flex flex-col mx-4'>
            <p className='text-slate-500'>Instructor:{course.instructor.firstName} </p>
            <p className='text-slate-500'>{course.description}</p>
        </div>
        {
          myCourse?
          <div className="flex flex-col gap-2 w-6/7 px-4">
                <div className="flex justify-between">
                    <p className='font-semibold'>progress</p>
                    <p className="text-slate-500">{progress}%</p>
                </div>        
                <div className="w-full h-2">
                    <div className="h-2 bg-black rounded-xl" style={{width: `${Math.max(progress, 2)}%` }}></div>
                </div>
                <button className='bg-slate-700 text-amber-50 w-3/4 mx-8 rounded-2xl p-1 my-2' onClick={()=>navigate(`/course-play/${course._id}`)}>Continue Learning</button>
            </div>
          :
          <button className='bg-slate-700 text-amber-50 w-3/4 mx-8 rounded-2xl p-1 my-2' onClick={()=>navigate(`/course-details/${course._id}`)}>View Course</button>
        }
        
       
    </div>
  )
}

export default CourseCard