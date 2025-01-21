import express from 'express'
import { getAll, addCourse, putCourse, deleteCourse, findCourseByTitle } from '../controller/courseController.js'

const router = express.Router()

router.get("/", getAll)
router.post("/", addCourse)
router.put("/:title", putCourse)
router.delete("/:title", deleteCourse)
router.get('/:title', findCourseByTitle);

export default router