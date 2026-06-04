import { createEnrollmentService,
    getEnrollmentByIdService,
    getMyEnrollmentService,
    completeLecService,
    deleteEnrollmentService,
getEnrollmentForCourseService } from "../service/enrollmentService.js";

export async function createEnrollment(req, res) {
    try {
        const user = req.user;
        const {courseId}=req.params;
        console.log(user);
           
            const enrollment=await getMyEnrollmentService(user.id);
            console.log("existingL",enrollment)
            if(enrollment.length>0){
                const existingItem=enrollment.find((item)=>item.course._id.toString()===courseId);
                if(existingItem){
                    throw new Error("You are already enrolled to this course!");
                }
            }

            const enroll = await createEnrollmentService(user,courseId);
            res.status(200).send({
                Data: {
                    message: "User Enrolled Successfully",
                    enroll
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

export async function getMyEnrollment(req, res) {

    try {
        const enrollment = await getMyEnrollmentService(req.user.id)
        res.status(200).send({
            Data: {
                message: "enrollment fetched Successfully",
                enrollment
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch Course Enrollment!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function getEnrollmentById(req, res) {

    const {id}=req.params;
    try {
        const enrollment = await getEnrollmentByIdService(id)
        res.status(200).send({
            Data: {
                message: "enrollment fetched Successfully",
                enrollment
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch Course Enrollment!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function getEnrollmentForCourse(req, res) {

    try {
        const {courseId}=req.params;
        const enrollment = await getEnrollmentForCourseService(req.user.id,courseId)
        res.status(200).send({
            Data: {
                message: "enrollment fetched Successfully",
                enrollment
            },
            Error: null
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to fetch Course Enrollment!",
                info: err.message
            },
            Data: null
        })
    }
}

export async function completeLecture(req,res){
   
    try {
          const {id,lectureId,courseId}=req.params;
           
            const enroll = await completeLecService(id,lectureId,courseId,req.user);
            res.status(200).send({
                Data: {
                    message: "Successfully Updated Status",
                    enroll
                },
                Error: null
            });
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to updated status Course!",
                info: err.message
            },
            Data: null
        })
    }

}

export async function deleteEnrollment(req,res){
     try {
       
        const {id}=req.params;
        console.log(user);
           
            const enroll = await deleteEnrollmentService(id);
            res.status(200).send({
                Data: {
                    message: "User Un-enrolled Successfully",
                    enroll
                },
                Error: null
            });
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to unenroll Course!",
                info: err.message
            },
            Data: null
        })
    }
}

