import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutSlice } from "./slices/authSlice.js";
import { useLogoutUserMutation } from "./apis/authApi.js";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [logoutUser] = useLogoutUserMutation();

  const [open, setOpen] = useState(false);

  async function logoutFun() {
    dispatch(logoutSlice());
    await logoutUser();
    toast.success("Logout successfully!");
    navigate("/auth");
  }

  return (
    <nav className="bg-gray-800 w-full relative">
      <Toaster position="top-center" />

    
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Mobile button */}
          <div className="sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-gray-300 hover:text-white"
            >
              {!open ? "☰" : "✕"}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://logodix.com/logo/1834118.png"
              className="h-10"
              alt="logo"
            />
          </div>

        
          <div className="hidden sm:flex gap-4">
            {!user ? (
              <Link className="text-gray-300" to="/">Home</Link>
            ) : user.role === "student" ? (
              <>
                <Link to="/student-dashboard" className="text-gray-300">Dashboard</Link>
                <Link to="/" className="text-gray-300">Home</Link>
                <Link to="/student-dashboard/my-course" className="text-gray-300">My Courses</Link>
              </>
            ) : (
              <>
                <Link to="/instructor-dashboard" className="text-gray-300">Dashboard</Link>
                <Link to="/" className="text-gray-300">Home</Link>
                <Link to="/instructor-dashboard/create-course" className="text-gray-300">Create</Link>
                <Link to="/instructor-dashboard/manage-course" className="text-gray-300">Manage</Link>
              </>
            )}
          </div>

          <div className="flex gap-4 text-white">
            {user ? (
              <>
                <span>Hi {user.firstName}</span>
                <button onClick={logoutFun}>Logout</button>
              </>
            ) : (
              <Link to="/auth">Login</Link>
            )}
          </div>

        </div>
      </div>

     
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50
        transform transition-transform duration-300 sm:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex flex-col gap-4">

          {!user ? (
            <Link onClick={() => setOpen(false)} to="/">Home</Link>
          ) : user.role === "student" ? (
            <>
              <Link onClick={() => setOpen(false)} to="/">Home</Link>
            <Link onClick={() => setOpen(false)} to="/student-dashboard">Dashboard</Link>
              <Link onClick={() => setOpen(false)} to="/student-dashboard/my-course">My Courses</Link>
            </>
          ) : (
            <>
              <Link onClick={() => setOpen(false)} to="/instructor-dashboard">Dashboard</Link>
              <Link onClick={() => setOpen(false)} to="/instructor-dashboard/create-course">Create</Link>
              <Link onClick={() => setOpen(false)} to="/instructor-dashboard/manage-course">Manage</Link>
            </>
          )}

        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 sm:hidden"
        />
      )}
    </nav>
  );
};

export default Navbar;