import Course from "../models/course.mjs";
import Lecture from "../models/lecture.mjs";
import { fetchCourseByIdService } from "./courseService.mjs";
import { fetchTranscript } from 'youtube-transcript';

export async function createLectureService(courseId, data) {
    const course = await fetchCourseByIdService(courseId);


    if (!course) {
        throw new Error("Course not found");
    }

    const lecture = new Lecture({ ...data, course: courseId });
    await lecture.save();
    course.lectures.push(lecture._id);
    await course.save();
    return lecture;

}

export function fetchLectureService() {
    return Lecture.find({})
        .populate("Course", "title description instructor")
        .sort({ createdAt: -1 });
}

export async function fetchLectureByIdService(id) {
    if (!id) {
        throw new Error("Lecture Id is not defined!");
    }
    console.log(id, "id from service")
    const lec = await Lecture.findOne({ _id: id });
    if (!lec) {
        throw new Error("Lecture not found!");
    }
    return lec
}

//ai
function extractVideoId(url) {
    const match = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&?/]+)/
    );
    return match?.[1] || null;
}

export async function fetchLectureByCourseIDService(courseId) {
    if (!courseId) {
        throw new Error("Course Id is not defined!");
    }

    const lectures = await Lecture.find({ course: courseId });

    return Promise.allSettled(
        lectures.map(async (lec) => {
            console.log(lec);

            if (lec.transcript?.text && lec.transcript?.fetchedAt) {
                return lec.toObject();
            }

            let transcriptText = "";

            try {
                // const videoId =await  extractVideoId(lec.videoUrl);

                // if (!videoId) {
                //     throw new Error("Invalid YouTube URL");
                // }

                const transcripts = await fetchTranscript(lec.videoUrl);
                console.log(transcripts)

                transcriptText =
                    transcripts?.map(t => t.text).join(" ")?.trim() ||
                    "Transcript is not available for this lecture.";

                await Lecture.findByIdAndUpdate(lec._id, {
                    transcript: {
                        text: transcriptText,
                        fetchedAt: new Date()
                    }
                });

            } catch (err) {
                console.log("Transcript fetch failed:", lec._id, err.message);
            }

            return {
                ...lec.toObject(),
                transcript: {
                    text: transcriptText
                }
            };
        })
    );
}

export async function updateLectureService(id, updates) {
    const lecture = await Lecture.findOne({ _id: id });

    const allowedFields = ["title", "description", "videoUrl", "duration"];

    for (let field of allowedFields) {
        if (updates[field] !== undefined) {
            lecture[field] = updates[field]
        }
    }

    return lecture.save();
}

export async function deleteLectureService(lectureId, courseId) {
    console.log(courseId, lectureId);
    if (!lectureId || !courseId) {
        throw new Error("Id required to delete lecture!")
    }
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        throw new Error("Lecture not found");
    }
    const course = await fetchCourseByIdService(courseId);
    if (!course) {
        throw new Error("course not found");
    }
    course.lectures.pull(lectureId);
    await course.save();
    console.log(courseId, lectureId);
    await Lecture.findByIdAndDelete(lectureId);

}

