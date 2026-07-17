import React from 'react'
import { useDeleteLectureMutation, useFetchLecByCourseIdQuery, useFetchLectureByIdQuery } from '../../../apis/lectureApi'
import { Toaster, toast } from 'react-hot-toast'
import { useState } from 'react'
import EditLecForm from './EditLecForm.jsx'
import {  useNavigate } from 'react-router-dom'

const EditLec = ({ courseID }) => {
    const [edit, setEdit] = useState(false);
    const[lectureId,setLectureId]=useState(null);
    const { data, isError, isLoading, refetch } = useFetchLecByCourseIdQuery(courseID);
    console.log( useFetchLecByCourseIdQuery(courseID))
    console.log(data)
    console.log(isError)
    const [deleteLec, result] = useDeleteLectureMutation();

    async function handleDeleteLec(lectureId) {
        console.log(courseID, lectureId)
        const res = await deleteLec({ courseID, lectureId });
        await refetch()
        console.log(res);
        if (res.data) {
            toast.success(res.data.Data.message);
             navigate("/instructor-dashboard");
        } else {
            toast.error(res.error.Error.info)
        }

    }

    function handleEditLec(lectureId){
        setLectureId(lectureId);
        setEdit(true);
    }



    return (
        <>
            {
                edit ? (<EditLecForm lectureId={lectureId} courseID={courseID}></EditLecForm>) : (
                    <div className="flex min-h-full  flex-col lg:px-8 overflow-hidden min-w-3/4 border border-gray-300 rounded-2xl shadow-md p-4">
                        <div className="mt-5 ">
                            <p className="text-md font-semibold">Manage lectures</p >
                            <p className="text-gray-400">Edit Lectures, delete Lectures.</p>
                        </div >
                        <div className='mt-5 w-full'>
                            <table className='w-full '>
                                <thead>
                                    <tr >
                                        <th className='text-md font-semibold text-left py-4'>Course</th>
                                        <th className='text-md font-semibold text-left'>Duration</th>
                                        <th className='text-md font-semibold text-right'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? (<tr><td colSpan={4}>Loading...</td></tr>) : isError ? (<tr><td colSpan={4}>Something went wrong-here</td></tr>) : data ?
                                            data?.Data?.lectures?.map((item) => (
                                             <tr className='border-t border-gray-300' key={item.value._id}>
                                                    <td className='text-md font-semibold py-2'>
                                                        <div className='flex flex-col'>
                                                            <span>{item.value.title}</span>
                                                            <p className='text-slate-600 font-light'>{item.value.description}</p>
                                                        </div>

                                                    </td>
                                                    <td>{item.value.duration}</td>

                                                    <td><div className='flex gap-4 justify-end'>

                                                        <button className='p-1 bg-gray-200 rounded-2xl' onClick={() => handleEditLec(item.value._id)}><i className="fa-regular fa-pen-to-square text-3xs"></i></button>
                                                        <button className='p-1 bg-gray-200 rounded-2xl' onClick={() => handleDeleteLec(item.value._id)}><i className="fa-solid fa-trash text-3xs text-red-600"></i></button>
                                                    </div></td>
                                                </tr>

                                            ))
                                            : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >
                )



            }



        </>

    )
}

export default EditLec