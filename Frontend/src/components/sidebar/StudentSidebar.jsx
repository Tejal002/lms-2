import React from 'react'
import { NavLink } from 'react-router-dom'

const StudentSidebar = () => {
    return (
        <div className='flex flex-col min-w-1/7 shadow-md p-4 gap-4 h-24 border border-gray-300 rounded-xl'>
            <NavLink to="/student-dashboard" className='text-slate-500'>Dashboard</NavLink>
            <NavLink to="/student-dashboard/my-course" className='text-slate-500'>My courses</NavLink>
        </div>
    )
}

export default StudentSidebar