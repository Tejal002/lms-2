import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { useLoginUserMutation } from "../apis/authApi";
import  {Toaster, toast } from "react-hot-toast";
import { loginSlice } from "../slices/authSlice.js";

export default function Login() {

   const [loginUser, result]=useLoginUserMutation();
   const dispatch=useDispatch();
   const navigate=useNavigate();



  const [formData, setFormData] = useState({
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
      const { Data } = await loginUser(formData).unwrap();
      if (Data) {
       
        const{user}=Data;
        dispatch(loginSlice(user));
        toast.success("User Login successfully!");
        navigate("/");
        
      }
    } catch (err) {
      console.log("error:", err);

      toast.error(`${err?.data?.Error?.info}`);
    }
  }


  return (
    <>
    <Toaster
                position="top-center"
                reverseOrder={false}
            />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleForm}  className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="@gmail.com"
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
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
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
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not have accont?{' '}
            <Link to={"/auth/register"} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
