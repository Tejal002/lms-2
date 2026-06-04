import { current } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BACKEND_URL="https://lms-2-2mmz.onrender.com";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl:`${BACKEND_URL}/api/users`,
        credentials:'include'
     }),

    endpoints: (build) => ({
        currentUser: build.query  ({
            query: () => `/me`,
        }),
        registerUser:build.mutation({
            query:(body)=>({
                url:"/create",
                method:"POST",
                body
            })
        }),
        loginUser:build.mutation({
            query:(body)=>({
                url:"/login",
                method:"POST",
                body
            })
        }),
        logoutUser:build.mutation({
            query:(body)=>({
                url:"/logout",
                method:"POST"
            })
        })

        
  }),
})


export const { useRegisterUserMutation,useLoginUserMutation,useCurrentUserQuery,useLogoutUserMutation } = authApi;
export default authApi;