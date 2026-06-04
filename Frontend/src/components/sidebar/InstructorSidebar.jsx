import React from 'react'
import { NavLink } from 'react-router-dom'

const InstructorSidebar = () => {
  return (
    <div className='flex flex-col min-w-1/6 shadow-md p-4 gap-4 h-fit border border-gray-300 rounded-xl'>
      <NavLink to="/student-dashboard" className='text-slate-500'>Dashboard</NavLink>
      <NavLink to="/student-dashboard/my-course" className='text-slate-500'>My courses</NavLink>
      <NavLink to="/instructor-dashboard" className='text-slate-500'>Instructor Dashboard</NavLink>
      <NavLink to="/instructor-dashboard/create-course" className='text-slate-500'>create course</NavLink>
      <NavLink to="/instructor-dashboard/manage-course" className='text-slate-500'>Manage course</NavLink>
    </div>
  )
}

export default InstructorSidebar