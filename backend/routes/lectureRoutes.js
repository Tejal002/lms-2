import {Router} from "express";
import { fetchLectures,fetchLectureById, createLecture, updateLecture, deleteLecture,fetchLectureByCourseID,fetchSummary } from "../controllers/lectureController.js";
import { authMiddleware, isInstructor, isOwner } from "../middleware/authMiddleware.js";

const router=Router();

router.get("/",fetchLectures);
router.post("/summary",fetchSummary)
router.get("/:lectureId",fetchLectureById);
router.get("/course/:courseId",authMiddleware,fetchLectureByCourseID);//this-is-imp
router.post("/course/:courseId",authMiddleware,isInstructor,isOwner,createLecture);
router.patch("/course/:courseId/:lectureId",authMiddleware,isInstructor,isOwner,updateLecture)
router.delete("/course/:courseId/:lectureId",authMiddleware,isInstructor,isOwner,deleteLecture)

export default router;

