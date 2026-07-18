
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//const BACKEND_URL="https://lms-2-2mmz.onrender.com";
const BACKEND_URL="http://localhost:3000";

export const enrollmentApi = createApi({
    reducerPath: 'enrollmentApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl:`${BACKEND_URL}/api/enrollment`,
        credentials:'include'
     }),

    endpoints: (build) => ({
        getMyEnrollment: build.query  ({
            query: () => `/`,
        }),

         getEnrollmentById: build.query  ({
            query: (id) => `/${id}`,
            providesTags: ["Enrollment"]
        }),

        getEnrollmentByCourse:build.query({
             query: (id) => `/course/${id}`,
        }),

       createEnrollment:build.mutation({
            query:(id)=>({
                url:`/course/${id}`,
                method:"POST",
                
            }),
            invalidatesTags: ["Enrollment"]
       }),

       completeLecture:build.mutation({
        query:({id,courseId,lectureId})=>({
            url:`/${id}/course/${courseId}/lectures/${lectureId}/complete`,
            method:"PATCH",
            
        })
       }),

       deleteEnrollment:build.mutation({
        query:(id)=>({
            url:`/${id}`,
            method:"DELETE"

        })
       })
       
        
  }),
})


export const { useGetMyEnrollmentQuery,useGetEnrollmentByCourseQuery,useGetEnrollmentByIdQuery,useCreateEnrollmentMutation,useCompleteLectureMutation,useDeleteEnrollmentMutation } = enrollmentApi;
export default enrollmentApi;