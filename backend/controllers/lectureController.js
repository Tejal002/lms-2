import {
    fetchLectureService,
    fetchLectureByIdService,
    createLectureService,
    updateLectureService,
    deleteLectureService, fetchLectureByCourseIDService
} from "../service/lectureService.js";


export async function fetchLectures(req, res) {
    try {
        const lecture = await fetchLectureService();
        res.status(200).send({
            Data: {
                message: "Lecture fetched Successfully",
                lecture
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch Lecture!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function fetchLectureById(req, res) {
    try {
        const { lectureId } = req.params;

        const lecture = await fetchLectureByIdService(lectureId);
        console.log(lecture);
        if (!lecture) {
            throw new Error("Invalid Id or lecture is not present")
        }
        console.log(lecture);
        res.status(200).send({
            Data: {
                message: "lecture fetched Successfully",
                lecture
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch lecture!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function fetchLectureByCourseID(req, res) {
    try {
        const { courseId } = req.params;
        console.log(req.params)
        console.log(courseId)
        const lectures = await fetchLectureByCourseIDService(courseId);


        res.set("Cache-Control", "no-store");
        res.status(200).send({
            Data: {
                message: "lecture fetched Successfully",
                lectures
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch lecture!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function fetchSummary(req, res) {
    try {
        const { transcript } = req.body;

        const API_KEY = process.env.GEMINI_API_KEY;

        const url =
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Summarize this transcript:\n\n${transcript}`,
                            },
                        ],
                    },
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data,
            });
        }

        res.json(data);

    }
    catch (err) {
        console.error("Summary error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createLecture(req, res) {
    //{title,desc,videourl,duration,}
    try {
        const { courseId } = req.params;
        const lecture = await createLectureService(courseId, req.body);
        res.status(200).send({
            Data: {
                message: "lecture created Successfully",
                lecture
            },
            Error: null
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to create lecture!",
                info: err.message
            },
            Data: null
        })
    }
}


export async function updateLecture(req, res) {
    try {

        const { lectureId } = req.params;
        console.log(lectureId)


        const lecture = await updateLectureService(lectureId, req.body);
        res.status(200).send({
            Data: {
                message: "lecture Updated Successfully",
                lecture
            },
            Error: null
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to Edit lecture!",
                info: err.message
            },
            Data: null
        })
    }

}

export async function deleteLecture(req, res) {
    try {
        const { lectureId, courseId } = req.params;
        console.log("params", req.params)
        let result = await deleteLectureService(lectureId, courseId)


        res.status(200).send({
            Data: {
                message: "lecture Deleted Successfully",
                result
            },
            Error: null
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to Delete lecture!",
                info: err.message
            },
            Data: null
        })
    }
}

