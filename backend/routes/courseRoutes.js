import { Router } from "express";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../cloudConfig.js"
import multer from "multer";
import { createCourse, fetchCourses ,fetchCoursesById,editCourseById,deleteCourseById,fetchInstructorCourses} from "../controllers/courseController.js";
import { authMiddleware, isInstructor, isOwner } from "../middleware/authMiddleware.js";

const router=Router()


const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"thumbnail",
        allowed_formats: ["jpg", "png", "jpeg"],
    }
})

const upload=multer({
    storage
})




router.post("/",authMiddleware,authMiddleware,isInstructor,upload.single("thumbnail") ,createCourse);
router.get("/",fetchCourses);//done
router.get("/myCourse",authMiddleware,isInstructor,fetchInstructorCourses);
router.get("/:id",fetchCoursesById);//done


router.patch("/:courseId",authMiddleware,isInstructor,isOwner,editCourseById)
router.delete("/:courseId",authMiddleware,isInstructor,isOwner,deleteCourseById)

export default router;