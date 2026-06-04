import Course from "../models/course.mjs";
import Enrollment from "../models/enrollment.mjs";
import Lecture from "../models/lecture.mjs";

export async function createCourseService(user, file, data) {
    console.log(file);
    if (!file) {
        throw new Error("thumbnail is required!");
    }
    const course = new Course({ ...data, instructor: user.id });
    course.thumbnail = {
        fileName: file.filename,
        url: file.path
    }

    return course.save()

}

export function fetchCourseService() {
    return Course.find({}).populate({
        path: "instructor",
        select: "firstName lastName"
    })
        .sort({ createdAt: -1 });
}

export function fetchCourseByIdService(id) {
    if (!id) {
        throw new Error("Course Id is not defined!");
    }
    console.log(id, "id from service")
    return Course.findOne({ _id: id }).populate("instructor", "firstName lastName email").populate("lectures", "title videoUrl duration description");;
}

export function fetchInstructorCourseService(id) {
    console.log("fetch-me", id)
    return Course.find({
        instructor: id
    }).populate({
        path: "instructor",
        select: "firstName lastName"
    }).sort({ createdAt: -1 });
}

export async function updateCourseByIdService(courseId, updateField) {

    const course = await Course.findOne({ _id: courseId });
    if(!course){
        throw new Error("course not found!")
    }
    const allowedFields = ["title", "description"];

    for (let field of allowedFields) {
        if (updateField[field] !== undefined) {
            course[field] = updateField[field]
        }
    }

    return await course.save();

}

export async function removeCourseService(courseId) {

    const course = await Course.findById(courseId);


    if (!course) {
        throw new Error("Course not found!");
    }

    await Lecture.deleteMany({ course: course._id });
    await Enrollment.deleteOne({ course: course._id })
    return course.deleteOne();

}