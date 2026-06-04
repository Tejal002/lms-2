import React from 'react'
import Navbar from '../../Navbar'
import { NavLink, Outlet } from 'react-router-dom'
import InstructorSidebar from '../../sidebar/InstructorSidebar'

const InstructorDashboard = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-wrap gap-4 pt-8 pl-4'>
                <InstructorSidebar/>

                <Outlet/>

            </div>
        </div>
    )
}

export default InstructorDashboard