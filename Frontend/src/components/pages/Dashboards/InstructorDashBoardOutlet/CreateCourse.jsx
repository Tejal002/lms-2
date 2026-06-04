import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useRegisterUserMutation } from "../../../apis/authApi";
import { Toaster, toast } from "react-hot-toast"
import FileUpload from "./FileUpload";
import { useCreateCourseMutation } from "../../../apis/courseApi.js";



export default function CreateCourse() {

    const [createCourse,result]=useCreateCourseMutation();
  
    const navigate = useNavigate();
   
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: "",

    });

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
        try {
            const data=new FormData();
            data.append("title",formData.title);
            data.append("description",formData.description);
            data.append("thumbnail",formData.thumbnail);
            
            console.log(formData);

             const { Data } = await createCourse(data).unwrap();
              if (Data) {
                console.log(formData)
                toast.success("Successfully Created Course!");
                navigate("/instructor-dashboard");
             }
        } catch (err) {
            console.log("error:", err);

            toast.error(`${err.data.Error.info}`);
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
                    <p className="text-md font-semibold">Create Course</p>
                    <p className="text-gray-400">Add a title, description and thumbnai for new course.</p>
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
                                        placeholder="Eg.MERN"
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
                                        placeholder="eg.Start Your Full-Stack Journey with MERN."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                        </div>

                        <div>
                            
                            <label htmlFor="thumbail" className="block text-sm/6 font-medium text-gray-900">
                                Thumbnail
                            </label>

                            <FileUpload formData={formData} handleChange={handleChange} setFormData={setFormData} />
                        
                        </div>



                        <div>
                            <button
                                type="submit"
                                className="flex w-full mt-4 justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Create course
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
