import React from 'react'
import Navbar from '../../Navbar'
import ReactPlayer from 'react-player'
import ReactMarkdown from "react-markdown";
import { useFetchLecByCourseIdQuery, useFetchLectureByIdQuery, useGenerateSummaryMutation } from "../../apis/lectureApi.js"
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast"
import { useState, useEffect } from 'react';
import { useCompleteLectureMutation, useGetEnrollmentByCourseQuery, useGetMyEnrollmentQuery } from '../../apis/enrollmentApi.js';
import Skeleton from '../Utility-Skeleton/Skeleton.jsx';


const CoursePlayer = () => {
    const { courseId } = useParams();
    const [summary, setSummary] = useState();
    const { data, error, isLoading, refetch } = useFetchLecByCourseIdQuery(courseId, {
        refetchOnMountOrArgChange: true
    });
    const [markComplete, result] = useCompleteLectureMutation();
    const [generateSummary, { data: summaryData,
        error: summaryError,
        isLoading: summaryLoading }] = useGenerateSummaryMutation()

    const [currentLec, setCurrentLec] = useState(null);
    const [progress, setProgress] = useState(0);

    const { data: enrollment,
        error: EnrollmentError,
        isLoading: EnrollmentLoading } = useGetEnrollmentByCourseQuery(courseId);

    console.log(summaryData)
    console.log(summaryError)
    console.log(summaryLoading)
    console.log(data);
    console.log(enrollment?.Data?.enrollment?._id);
    console.log(EnrollmentError);

    async function handleMarkAsComplete(lectureId) {

        const id = enrollment?.Data?.enrollment?._id;
        const response = await markComplete({ id, courseId, lectureId });
        if (response.data) {
            await refetch();
            toast.success(response.data.Data.message);
        } else {
            toast.error(response?.data?.Error?.info || "Something went wrong");
        }
    }

    async function handleSummarize() {
        try {
            const response = await generateSummary(
                `Summarize the following transcript:\n\n${currentLec?.transcript?.text}`
            ).unwrap();

            const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;
            setSummary(text)


        } catch (err) {
            console.error(err);
            toast.error(summaryError?.data?.error?.message || "Something went wrong");
        }
    }


    useEffect(() => {
        if (data) {
            toast.success("Best wishes for your Learning!!");
        }
        if (data?.Data?.lectures?.length == 0) {
            toast.error("Instructor had not uploaded lectures yet!!");
        }
        if (data?.Data?.lectures?.length) {
            setCurrentLec(data.Data.lectures[0]);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.Error?.info || "Something went wrong");
        }
    }, [error]);



    return (
        <div className>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Navbar />

            <div className='flex w-full p-8 gap-4 '>
                <div className='w-3/4 rounded-2xl flex flex-col gap-2 h-full  p-8 shadow-lg border border-gray-300'>
                    <p className="text-md font-semibold">{currentLec?.title}</p>
                    <p className="text-gray-400">{currentLec?.description}</p>

                    {
                        isLoading ?
                            <Skeleton /> :
                            data?.Data?.lectures?.length == 0 ?
                                <p>No lectures Found!</p>
                                :
                                <figure className="grid aspect-video place-items-center overflow-hidden rounded-2xl bg-muted">
                                    <ReactPlayer src={currentLec?.videoUrl}

                                        controls width={"100%"} height={"100%"} />
                                </figure>
                    }



                    <div className="flex justify-between">
                        <p className='font-semibold'>progress</p>
                        <p className="text-slate-500">{progress}%</p>
                    </div>
                    <div className="w-full h-2">
                        <div className="h-2 bg-black rounded-xl" style={{ width: `${Math.max(progress, 2)}%` }}></div>
                    </div>
                    <button className='bg-slate-700 text-amber-50 w-1/6 rounded-2xl p-1 my-1 text-sm' onClick={() => handleMarkAsComplete(currentLec?._id)}>Mark as Complete</button>
                    <div className="h-1/3 flex flex-col gap-3">
                        <p className='font-semibold'>Transcript</p>
                        <div className="h-40 overflow-y-auto rounded-lg border border-gray-300 p-4 shadow-lg">
                            <p className="text-sm text-gray-500">
                                {currentLec?.transcript?.text}
                            </p>
                        </div>

                        <button
                            className='bg-slate-700 text-amber-50 w-1/6 rounded-2xl p-1 my-1 text-sm'
                            onClick={() => handleSummarize(currentLec?.transcript?.text)}
                        >
                            Summarize Lecture
                        </button>
                        <div className="h-40 overflow-y-auto rounded-lg border border-gray-300 p-4 shadow-lg">

                            {
                                summaryLoading ?
                                    (<p className="text-sm text-gray-400">Processing...</p>)
                                    :
                                    summaryError ? (<p className="text-sm text-red-500">Failed to generate summary</p>)
                                        : summaryData ? (
                                            <p className="text-md text-gray-700 whitespace-pre-wrap">
                                                <ReactMarkdown>
                                                    {summary}
                                                </ReactMarkdown>
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500">
                                                No summary generated yet
                                            </p>
                                        )
                            }

                        </div>
                    </div>



                </div>

                <div className='rounded-2xl p-8 shadow-md h-fit  border border-gray-300 flex flex-col gap-4 justify-center'>
                    <div className='flex flex-col'>
                        <p className="text-md font-semibold">Lectures</p>
                        <p className="text-gray-400">Navigate lectures and mark progress.</p>
                    </div>

                    {
                        data?.Data?.lectures?.map((item, index) => (
                            <button
                                key={index}
                                className='bg-black rounded-2xl w-3/4 flex flex-col justify-center items-start font-medium text-sm p-2'
                                onClick={() => setCurrentLec(item)

                                }>
                                <div className='text-amber-100 flex items-center gap-2'>
                                    <i className="fa-regular fa-circle-play "></i>
                                    <p className=''>{index + 1}.{item.title}</p>
                                </div>
                                <p className='text-gray-300 pl-6'>{item.duration} min</p>
                            </button>
                        ))
                    }

                </div>
            </div>

        </div>
    )
}

export default CoursePlayer