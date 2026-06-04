import Enrollment from "../models/enrollment.mjs";
import Course from "../models/course.mjs"
import {fetchLectureByIdService} from "../service/lectureService.js"

export async function createEnrollmentService(user, courseId) {
    const enrollment = new Enrollment({
        course: courseId,
        user: user.id
    })

    await Course.findByIdAndUpdate(courseId, {
        $inc: { totalStudents: 1 }
    })


    return enrollment.save()
}

export function getMyEnrollmentService(userId) {
    return Enrollment.find({ user: userId }).populate({
        path: "course",
        select: "title description lectures thumbnail totalStudents rating",
        populate: {
            path: "instructor",
            select: "firstName lastName -_id"
        }
    }).sort({ createdAt: -1 });
}

export function getEnrollmentByIdService() {
    return Enrollment.findOne(id);
}


export async function getEnrollmentForCourseService(userId, courseId) {
    console.log(userId, courseId);
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
        throw new Error("User not enrolled to this course")
    }
    return enrollment;
}

export async function completeLecService(id, lectureId, courseId, user) {

    const enrollment = await Enrollment.findById(id).populate("course");
    if (!enrollment) throw new Error("Enrollment doesn't exist!");


    if (!enrollment.user.equals(user.id)) {
        throw new Error("User doesn't match!");
    }

    if (enrollment.course._id.toString() !== courseId.toString()) {
        throw new Error("User not enrolled to this class!");
    }

   
    await Enrollment.findByIdAndUpdate(
        id,
        {
            $addToSet: {
                completedLectures: lectureId
            }
        }
    );

   
    const updatedEnrollment = await Enrollment.findById(id).populate("course");

    const totalLectures = updatedEnrollment.course.lectures.length;

    updatedEnrollment.progress = totalLectures
        ? Math.round(
            (updatedEnrollment.completedLectures.length / totalLectures) * 100
          )
        : 0;

    return await updatedEnrollment.save();
}

export function deleteEnrollmentService(id) {
    return Enrollment.findByIdAndDelete(id)
}