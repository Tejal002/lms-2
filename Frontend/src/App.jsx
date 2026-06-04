import { useState } from 'react'
import './App.css'

import { Toaster, toast } from "react-hot-toast"
import Login from './components/authPages/Login.jsx'
import Signup from './components/authPages/Signup.jsx'
import AuthLayout from './components/authPages/AuthLayout.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from './components/pages/MainPage.jsx'
import CourseDetails from './components/pages/Course-Pages/CourseDetails.jsx'
import StudentDashboard from './components/pages/Dashboards/StudentDashboard.jsx'
import MyCourse from './components/pages/Course-Pages/MyCourse.jsx'
import InstructorDashboard from './components/pages/Dashboards/InstructorDashboard.jsx'
import { useSelector } from 'react-redux'
import { InstructorRoute, ProtectedRoute } from './components/ProtectedRoute.jsx'
import InstructorDashboardDetails from './components/pages/Dashboards/InstructorDashBoardOutlet/InstructorDashboardDetails.jsx'
import CreateCourse from './components/pages/Dashboards/InstructorDashBoardOutlet/CreateCourse.jsx'
import ManageCourse from './components/pages/Dashboards/InstructorDashBoardOutlet/ManageCourse.jsx'
import CoursePlayer from './components/pages/Course-Pages/CoursePlayer.jsx'
import NotFound from './components/pages/NotFound.jsx'


function App() {
  const [count, setCount] = useState(0)
  const user = useSelector(state => state.auth.user);


  return (
    <>
      <BrowserRouter>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Signup />}></Route>
          </Route>

          <Route path='/'>
            <Route index element={<MainPage />} />
            <Route path='course-details/:courseId' element={<CourseDetails />}></Route>
          </Route>

          <Route path='/student-dashboard'>
            <Route index element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>

            } />
            <Route path='my-course' element={
              <ProtectedRoute>
                <MyCourse />
              </ProtectedRoute>

            } />
          </Route>

          {/* // <InstructorRoute> */}
          <Route path='/instructor-dashboard' element={
            <InstructorRoute>
              <InstructorDashboard/>
            </InstructorRoute>
            
            }>
            <Route index element={<InstructorDashboardDetails/>}/>
            <Route path='create-course' element={<CreateCourse/>}/>
            <Route path='manage-course' element={<ManageCourse/>}/>
            
         </Route>

          <Route path='/course-play/:courseId' element={<CoursePlayer/>}>
          </Route>
          <Route path='/*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter >
    </>
  )
}

export default App
