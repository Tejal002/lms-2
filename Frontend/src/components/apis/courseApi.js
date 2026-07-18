import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//const BACKEND_URL="https://lms-2-2mmz.onrender.com";
const BACKEND_URL="http://localhost:3000";

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl:`${BACKEND_URL}/api/courses`,
        credentials:'include'
     }),

    endpoints: (build) => ({
        fetchCourses: build.query  ({
            query: () => `/`,
        }),
        fetchMyCourse:build.query({
            query: () => `/myCourse`,
        }),
       createCourse:build.mutation({
            query:(body)=>({
                url:"/",
                method:"POST",
                body
            })
       }),
       fetchCourseById:build.query({
            query:(id)=>`/${id}`
       }),
       editCourseById:build.mutation({
        query:({id,updateField})=>({
            url:`/${id}`,
            method:"PATCH",
            body:updateField
        })
       }),

       deleteCourseById:build.mutation({
        query:(id)=>({
            url:`/${id}`,
            method:"DELETE"

        })
       })
       
        
  }),
})


export const { useFetchCoursesQuery,useFetchMyCourseQuery,useCreateCourseMutation,useFetchCourseByIdQuery,useEditCourseByIdMutation,useDeleteCourseByIdMutation } = courseApi;
export default courseApi;