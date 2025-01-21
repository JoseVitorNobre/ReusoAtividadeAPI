import express from 'express'
import { getAll, addCourse, putCourse, deleteCourse, findCourseById } from '../controller/courseController.js'

const router = express.Router()

router.get("/cursos", getAll)
router.post("/cursos", addCourse)
router.put("/cursos/:id", putCourse)
router.delete("/cursos/:id", deleteCourse)
router.get('/cursos/:id', findCourseById);

export default router