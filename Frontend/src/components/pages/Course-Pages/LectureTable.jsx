import React from 'react'

const LectureTable = ({ lecture }) => {
    console.log(lecture)
    return (

        <table className="w-full shadow-md">
            <thead>
                <tr>
                    <th className="px-2 text-left">Lecture</th>
                </tr>
            </thead>

            <tbody>
                {lecture ? (
                    lecture.map((lec) => (
                        <tr
                            key={lec.id}
                            className="bg-white hover:bg-gray-50 hover:shadow-md transition-all"
                        >
                            <td className="p-3">
                                <div className="flex flex-col gap-1">
                                   
                                    <div className="font-medium text-base">
                                        {lec.title}
                                    </div>

                                    
                                    <div className="text-sm text-slate-500">
                                        {lec.description}
                                    </div>

                                    <div className="text-xs text-slate-400">
                                        {lec.duration} min
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="p-3">No lecture found</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default LectureTable