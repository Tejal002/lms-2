import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useCreateLectureMutation } from '../../../apis/lectureApi';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom'

const CreateLec = ({courseID}) => {

    const [createLecture,result]=useCreateLectureMutation();
    const navigate=useNavigate()

     const [formData,setFormData]=useState({
            title:"",
            description:"",
            videoUrl:"",
            duration:""
        })

    function handleChange(e){
            e.preventDefault();
            const {name,value}=e.target;
            setFormData((prev)=>(
                {
                    ...prev,[name]:value
                }
            ))
        }
    
        async function handleSubmit(e){
            e.preventDefault();
            console.log(formData)
            const result=await createLecture({courseID,formData});
            if(result.data.Data.message){
                toast.success(result.data.Data.message)
                navigate("/instructor-dashboard")
                
            }else{
                toast.error(result.data.Error.info)
            }
            
        }
    

    return (
        <div className="flex min-h-full flex-col justify-center items-start lg:px-8 overflow-hidden min-w-3/4 border border-gray-300 rounded-2xl shadow-md p-4">

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <p className="text-md font-semibold">Add lecture</p>
                <p className="text-gray-400">Add a video lecture to React Fundamentals.</p>
                <form onSubmit={handleSubmit} method='POST' >

                    <div className="flex gap-1">
                        <div className="w-full">
                            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                Title
                            </label>

                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Eg.Lecture 1"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="flex gap-1">
                        <div className="w-full">
                            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                Description
                            </label>

                            <div className="mt-2">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="eg.Introduction to React."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                    </div>

                    <div>

                        <label htmlFor="videoUrl" className="block text-sm/6 font-medium text-gray-900">
                            Video Url
                        </label>
                        <div className="mt-2">
                            <input
                                id="videoUrl"
                                name="videoUrl"
                                type="text"
                                placeholder="eg.https//some-url/."
                                value={formData.videoUrl}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>



                    </div>

                    <div>

                        <label htmlFor="duration" className="block text-sm/6 font-medium text-gray-900">
                            Duration in minutes
                        </label>
                        <div className="mt-2">
                            <input
                                id="duration"
                                name="duration"
                                type="number"
                                placeholder="eg.30"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>



                    </div>



                    <div>
                        <button
                            type="submit"
                            className="flex w-2/3 mt-4 ml-14 justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 "
                        >
                            Add Lecture
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateLec