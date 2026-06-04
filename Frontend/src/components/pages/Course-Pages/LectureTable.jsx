import React from 'react'

const LectureTable = ({ lecture }) => {
    console.log(lecture)
    return (

        <table className='w-full shadow-md'>
            <thead className='space-y-4'>
                <tr className=''>
                    <td className='px-2'>Title</td >
                    <td className='text-left'>Description</td>
                    <td className='text-left'>Duration</td>
                </tr>
            </thead>

            <tbody className="space-y-4">
                {
                    lecture ? lecture.map((lec) => (
                        <tr className='h-12 bg-white hover:bg-gray-50 hover:shadow-xl transition-all duration-300'>
                            <td className='font-medium px-2'>{lec.title}</td>
                            <td>{lec.description}

                            </td>
                            <td>{lec.duration}min</td>
                        </tr>
                    ))

                        : "No lecture found"
                }

            </tbody>

            

        </table>
    )
}

export default LectureTable