import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    createEnrollment,
    getMyEnrollment,
    getEnrollmentById,
    deleteEnrollment,
    completeLecture,
    getEnrollmentForCourse
} from "../controllers/enrollmentController.js";

const router = Router();


router.get("/", authMiddleware, getMyEnrollment);//done
router.get("/:id", getEnrollmentById);
router.get("/course/:courseId",authMiddleware,getEnrollmentForCourse)
router.post("/course/:courseId", authMiddleware, createEnrollment);
//yet to cover
router.patch("/:id/course/:courseId/lectures/:lectureId/complete",authMiddleware, completeLecture);
router.delete("/:id", deleteEnrollment);

export default router;