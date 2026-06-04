import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterUserMutation } from "../apis/authApi";
import  {Toaster, toast } from "react-hot-toast"

export default function Signup() {

    const [registerUser, result] = useRegisterUserMutation();
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        role: "",
        email: "",
        password: ""
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
            const {Data} = await registerUser(formData).unwrap();
           if(Data){
            toast.success("User Register successfully!");
            navigate("/auth");
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
            <div className="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8 overflow-hidden">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleForm} >

                        <div className="flex gap-1">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                                    FirstName
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Eg.Tejal"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                                    LastName
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="eg.Patil"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="flex gap-1">
                            <div className="w-1/2">
                                <label htmlFor="age" className="block text-sm/6 font-medium text-gray-900">
                                    Age
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="age"
                                        name="age"
                                        type="text"
                                        placeholder="eg.23"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                                    Role
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="role"
                                        name="role"
                                        type="text"
                                        placeholder="student or instructor"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="eg.@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="my-4">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have account?{' '}
                        <Link to={"/auth"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
