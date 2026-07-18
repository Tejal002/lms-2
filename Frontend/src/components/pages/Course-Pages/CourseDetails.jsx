import React from 'react'
import Navbar from '../../Navbar.jsx'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useFetchCourseByIdQuery } from '../../apis/courseApi.js';
import Skeleton from '../../pages/Utility-Skeleton/Skeleton.jsx';
import { useCreateEnrollmentMutation, useGetEnrollmentByCourseQuery } from '../../apis/enrollmentApi.js';
import { useDispatch } from 'react-redux';
import { Toaster, toast } from "react-hot-toast"
import LectureTable from './LectureTable.jsx';
import { useCreateOrderMutation, useVerifyPaymentMutation } from '../../apis/paymentApi.js';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  console.log(courseId);
  console.log(useGetEnrollmentByCourseQuery(courseId))

  const { data, isError, isLoading } = useFetchCourseByIdQuery(courseId);
  const { status } = useGetEnrollmentByCourseQuery(courseId);
   const [createOrder]=useCreateOrderMutation();
   const [verifyPayment]=useVerifyPaymentMutation();
  console.log(status)
  const [createEnroll, result] = useCreateEnrollmentMutation();
  console.log(data)
  console.log(isError)
  console.log(useFetchCourseByIdQuery(courseId))


  const handleBuyCourse = async () => {
  try {
    // Create Razorpay Order
    const response = await createOrder({
      amount: data?.Data?.course?.price,
      
    }).unwrap();  
    console.log(response)

    const order = response.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: order.amount,

      currency: order.currency,

      name: "My LMS",

      description: data?.Data?.course?.title,

      order_id: order.id,

      prefill: {
        name:"",
        email: "",
      },

      theme: {
        color: "#0FA5DF",
      },

      handler: async function (paymentResponse) {
        try {
          const verifyRes = await verifyPayment({
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
            courseId:  data?.Data?.course?._id,
          }).unwrap();

          console.log(verifyRes)

          toast.success(
            verifyRes.message || "Payment Successful"
          );

          if(verifyRes.success){
            handleEnroll(data?.Data?.course?._id)
          }

          // Optional: navigate("/my-learning");
        } catch (err) {
          console.log(err);
          toast.error("Payment Verification Failed");
        }
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.log(response.error);

      toast.error(response.error.description);
    });

    razorpay.open();
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

  async function handleEnroll(id) {

    try {
      const result = await createEnroll(id).unwrap();
      console.log(result);
      if (result) {
        toast.success("successfully Enrolled to the course!");

        setTimeout(() => {
          navigate("/student-dashboard/my-course");
        }, 2000)

      }
    } catch (err) {
      console.log("error:", err);
      toast.error(err.data.Error.info);
    }
  }



  return (

    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />
      {
        isLoading ? (<div className='flex flex-col gap-4 w-screen h-screen mt-8'>
          <div className='flex'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className='flex'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>) :
          isError ? (<p>Something went wrong!</p>) :
            data ?
              <div>
                <div className='flex m-8 p-2 gap-16 flex-wrap'>
                  <div className='w-3/5'>
                    <div className='flex flex-col bg-gray-200 w-full items-start gap-2 p-8 rounded-3xl'>
                      <h3 className='text-3xl font-semibold'>{data.Data.course.title}</h3>
                      <p className='text-gray-500'>{data.Data.course.description}</p>
                      <p className='font-semibold'>Created by: {data.Data.course.instructor.firstName} {data.Data.course.instructor.lastName}</p>
                      <p className='font-semibold'>Total Students: {data.Data.course.totalStudents}</p>
                      <p className='font-semibold'>Total Price: {data.Data.course.price}</p>
                    </div>
                    <div className='flex flex-col w-full items-start gap-2 py-8 rounded-3xl'>
                      <h3 className='font-semibold text-2xl'>Course Content</h3>
                      <div className='w-full'>
                        {
                          data.Data.course.lectures.length > 0 ? <LectureTable lecture={data.Data.course.lectures || []} /> : 'Instructor not uploaded content yet!'
                        }

                      </div>
                    </div>
                  </div>


                  <div className='shadow-md p-4 w-72 rounded-2xl border border-slate-300' >
                    <div className='flex flex-col gap-2 items-center'>
                      <h4 className='font-semibold text-xl text-left'>Start Learning</h4>
                      <p className='text-slate-400'>Enroll to unlock the full lecture player and progress tracking</p>
                      {
                        status == 'fulfilled' ? <button className='bg-slate-400 rounded-2xl text-white p-2 w-3/4' disabled>Already Enrolled</button>
                          : <button className='bg-black rounded-2xl text-white p-2 w-3/4' onClick={handleBuyCourse} >{result.isLoading ? "Enrolling" : "Enroll now"}</button>
                      }

                      

                     
                    </div>
                  </div>
                </div>
              </div>
              : <p>Something went wrong!</p>
      }

    </div>
  )
}

export default CourseDetails