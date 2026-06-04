import { validateToken } from "../bcrypt/jwt.js";
import { fetchCourseByIdService } from "../service/courseService.mjs";

export function authMiddleware(req, res, next) {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token is not defined!");
        }
        const user = validateToken(token);
        if (!user) {
            throw new Error("Token is not valide!");
        }
        req.user = user;
        console.log("From middleware:", req.user);
        next();
    }
    catch (err) {
        console.log(err);
        
        next(err);
    }

}

export function isInstructor(req, res, next) {
    try {
        const user = req.user;
        if (user.role !== "instructor") {
            throw new Error("Only Instructor can manage Course");
        }
        next()
    }
    catch (err) {
        console.log(err);

        next(err);
    }

}


export async function isOwner(req, res, next) {
    const user = req.user;
    const { courseId } = req.params;
    console.log(courseId,"not defined");
    try {
        if (!user || !courseId) {
            throw new Error("Field is missing!");
        }
        const course = await fetchCourseByIdService(courseId);

        if (!course) {
            throw new Error("Course not found");
        }
        console.log("I:", course.instructor);
        if (!course.instructor.equals(user.id)) {
            throw new Error("Only Owner can manage Course");

        }
        next()
    }
    catch (err) {
        console.log(err);
        next(err);
    }

}