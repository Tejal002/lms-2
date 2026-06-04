import { createCourseService, fetchCourseService, fetchCourseByIdService, fetchInstructorCourseService, updateCourseByIdService, removeCourseService } from "../service/courseService.mjs"


export async function createCourse(req, res) {
    try {
        const user = req.user;
        console.log(user);
        console.log(req.file);
        const course = await createCourseService(user, req.file, req.body);
        res.status(200).send({
            Data: {
                message: "Course created Successfully",
                course
            },
            Error: null
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to create Course!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function fetchCourses(req, res) {
    try {
        const courses = await fetchCourseService()
        res.status(200).send({
            Data: {
                message: "Courses fetched Successfully",
                courses
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch Course!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function fetchCoursesById(req, res) {
    try {
        const { id } = req.params;
        console.log(id);
        const course = await fetchCourseByIdService(id);
        console.log(course);
        if (!course) {
            throw new Error("Invalid Id or Course is not present")
        }
        console.log(course);
        res.status(200).send({
            Data: {
                message: "Course fetched Successfully",
                course
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch Course!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function fetchInstructorCourses(req, res) {
    console.log(req.user)
    try {
        const courses = await fetchInstructorCourseService(req.user.id)
        res.status(200).send({
            Data: {
                message: "Courses fetched Successfully",
                courses
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch Course!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function editCourseById(req, res) {
    try {
        const { courseId } = req.params;
        console.log(req.body)

        if (!courseId) {
            return res.status(400).send({
                Error: { info: "courseId is required" },
                Data: null,
            });
        }


        //Yet to complete
        const course = await updateCourseByIdService(courseId, req.body);
        res.status(200).send({
            Data: {
                message: "Course updated Successfully",
                course
            },
            Error: null
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to Edit Course!",
                info: err.message
            },
            Data: null
        })
    }

}

export async function deleteCourseById(req, res) {
    try {
        const { courseId } = req.params;



        const response = await removeCourseService(courseId);

        res.status(200).send({
            Data: {
                message: "Course Deleted Successfully",
                response
            },
            Error: null
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to Delete Course!",
                info: err.message
            },
            Data: null
        })
    }
}