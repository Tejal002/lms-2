
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//const BACKEND_URL = "https://lms-2-2mmz.onrender.com";
const BACKEND_URL="http://localhost:3000";

export const lectureApi = createApi({
    reducerPath: 'lectureApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/lectures`,
        credentials: 'include'
    }),

    endpoints: (build) => ({

        fetchLecture: build.query({
            query: () => `/`,
        }),

        fetchLectureById: build.query({
            query: (lectureId) => `/${lectureId}`,
        }),

        fetchLecByCourseId: build.query({
            query: (id) => `/course/${id}`
        })
        ,
        createLecture: build.mutation({
            query: ({ courseID, formData }) => ({
                url: `/course/${courseID}`,
                method: "POST",
                body: formData
            })
        }),

        updateLecture: build.mutation({
            query: ({ courseID, lectureId, updateField }) => ({

                url: `/course/${courseID}/${lectureId}`,
                method: "PATCH",
                body: updateField
            })
        }),

        generateSummary: build.mutation({
            query: (transcript) => ({
                url: "/summary",
                method: "POST",
                body: { transcript }
            })
        }),

        deleteLecture: build.mutation({
            query: ({ courseID, lectureId }) => ({
                url: `/course/${courseID}/${lectureId}`,
                method: "DELETE"

            })
        })


    }),
})


export const { useFetchLectureQuery, useFetchLectureByIdQuery,useGenerateSummaryMutation, useFetchLecByCourseIdQuery, useCreateLectureMutation, useUpdateLectureMutation, useDeleteLectureMutation } = lectureApi;
export default lectureApi;