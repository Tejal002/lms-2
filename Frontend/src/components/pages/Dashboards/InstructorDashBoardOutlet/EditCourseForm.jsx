import React from 'react'
import { useState,useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast"
import { useEditCourseByIdMutation, useFetchCourseByIdQuery } from '../../../apis/courseApi';
import { useNavigate } from 'react-router-dom';

const EditCourseForm = ({courseID }) => {

    const[editCourse,result]=useEditCourseByIdMutation();
   const navigate= useNavigate()

    const { data, error, isLoading } = useFetchCourseByIdQuery(courseID);
    console.log(data);
   
    console.log(error);
   

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: ""     
    });

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.Data.course.title || "",
                description:  data.Data.course.description || "",
                thumbnail: data.Data.course.thumbnail.url || ""
              
            });
        }
    }, [data]);

    function handleChange(e) {
        console.log("inside handle-change");
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prev) => ({
            ...prev, [name]: value
        }))

    }

    async function handleForm(e) {
        e.preventDefault();
        const result=await editCourse({id:courseID,updateField:formData});
        console.log(result);
        if(result.data.Data){
            toast.success(result?.data?.Data?.message);
             navigate("/instructor-dashboard");
        }else{
             toast.success(result?.data?.Error?.info);
        }
       
    }
    return (

        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex min-h-full flex-col justify-center items-start lg:px-8 overflow-hidden min-w-3/4 border border-gray-300 rounded-2xl shadow-md p-4">

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <p className="text-md font-semibold">Edit course</p>
                    <p className="text-gray-400">Update the course details students see in the catalog.</p>
                    <form onSubmit={handleForm} >

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
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full mt-4 justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Edit Course
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>

    )
}

export default EditCourseForm