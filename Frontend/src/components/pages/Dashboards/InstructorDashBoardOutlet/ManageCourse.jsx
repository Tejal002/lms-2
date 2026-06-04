import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useDeleteCourseByIdMutation, useFetchMyCourseQuery } from '../../../apis/courseApi'
import CreateLec from './CreateLec.jsx'
import EditLec from './EditLec.jsx'
import EditCourseForm from './EditCourseForm.jsx'

const ManageCourse = () => {

    const [courseID, setCourseID] = useState(null)
    const { data, error, isLoading,refetch } = useFetchMyCourseQuery({
        undefined,
        refetchOnMountOrArgChange: true
    });
    const [deleteCourse,result]=useDeleteCourseByIdMutation();
    
    console.log(error);
    const [openCreateLec, setOpenCreateLec] = useState(false);
    const [openEditLec, setOpenEditLec] = useState(false);
    const[openEditCourse,setOpenEditCourse]=useState(false);


    if (error) {
        toast.error(error.data.Error.info)
    }

    function handleAdd(courseId) {
        setCourseID(courseId)
        setOpenCreateLec((prev) => !prev);
    }

    function handleEdit(courseId){
         setCourseID(courseId)
         setOpenEditLec(true)
    }

     function handleEditCourse(courseId){
         setCourseID(courseId)
         setOpenEditCourse(true)
    }

    async function handleDelete(courseId){
        const result=await deleteCourse(courseId);
        await refetch();
        console.log(result);
    }


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {
                openCreateLec ?
                    <CreateLec courseID={courseID} />
                    :
                    openEditLec ?
                        <EditLec courseID={courseID}/>
                    :
                    openEditCourse ?
                        <EditCourseForm courseID={courseID}></EditCourseForm>    
                        :
                        <div className="flex min-h-full  flex-col lg:px-8 overflow-hidden min-w-3/4 border border-gray-300 rounded-2xl shadow-md p-4">
                            <div className="mt-5 ">
                                <p className="text-md font-semibold">Manage courses</p>
                                <p className="text-gray-400">Edit courses, delete courses, and add lectures.</p>
                            </div>
                            <div className='mt-5 w-full'>
                                <table className='w-full '>
                                    <thead>
                                        <tr >
                                            <th className='text-md font-semibold text-left py-4'>Course</th>
                                            <th className='text-md font-semibold text-left'>Lectures</th>
                                            <th className='text-md font-semibold text-left'>Students</th>
                                            <th className='text-md font-semibold text-right'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            isLoading ? (<tr><td colSpan={4}>Loading...</td></tr>) : error ? (<tr><td colSpan={4}>Something went wrong!!!</td></tr>) :
                                                data ? (
                                                    data?.Data?.courses?.map((item) => (

                                                        <tr className='border-t border-gray-300' key={item._id}>
                                                            <td className='text-md font-semibold py-4'>
                                                                <div className='flex flex-col'>
                                                                    <span>{item.title}</span>
                                                                    <p className='text-slate-600 font-light'>{item.description}</p>
                                                                </div>

                                                            </td>
                                                            <td>{item.lectures.length}</td>
                                                            <td>{item.totalStudents}</td>
                                                            <td><div className='flex gap-4 justify-end'>
                                                                <button className='p-1 bg-gray-200 rounded-2xl' onClick={() => handleAdd(item._id)}><i className="fa-solid fa-plus text-3xs"></i></button>
                                                                <button className='p-1 bg-gray-200 rounded-2xl' onClick={() => handleEdit(item._id)}><i className="fa-solid fa-list text-3xs"></i></button>
                                                                <button className='p-1 bg-gray-200 rounded-2xl' onClick={()=>handleEditCourse(item._id)}><i className="fa-regular fa-pen-to-square text-3xs"></i></button>
                                                                <button className='p-1 bg-gray-200 rounded-2xl' onClick={() => handleDelete(item._id)}><i className="fa-solid fa-trash text-3xs text-red-600"></i></button>
                                                            </div></td>
                                                        </tr>

                                                    )))
                                                    : null
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
            }


        </>
    )
}

export default ManageCourse