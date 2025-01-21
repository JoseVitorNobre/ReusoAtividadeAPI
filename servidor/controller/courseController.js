import { CourseModel } from "../postgres/postgres.js";

export const getAll = async (req, res) => {
    try {
        const { filter, order } = req.query;

        let courses;
        if (!filter || !order) {
            courses = await CourseModel.findAll();
        } else {
            courses = await CourseModel.findAll({
                order: [[filter, order]],
            });
        }

        if (courses.length === 0) {
            return res.status(200).json({
                message: "Nenhum curso encontrado",
            });
        }

        return res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
};

export const addCourse = async (req, res) => {
    const { title, description, workload } = req.body;
    const missingFields = [];

    if (title == null) missingFields.push("titulo");
    if (description == null) missingFields.push("descrição");
    if (workload == null) missingFields.push("carga horária");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Campos ausentes: [${missingFields.join(", ")}]`,
        });
    }

    try {
        const course = await CourseModel.findOne({
            where: {
                title: title,
            },
        });

        if (course == null) {
            await CourseModel.create(req.body);
            return res.status(201).json({ message: "Curso criado com sucesso" });
        }

        return res.status(400).json({ message: "Curso já existe" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
};

export const putCourse = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const [rowsUpdated] = await CourseModel.update(updatedData, { where: { id } });

        if (rowsUpdated === 0) {
            return res.status(404).json({ message: "Curso não encontrado" });
        }

        return res.status(200).json({
            message: "Curso editado com sucesso",
            updatedFields: updatedData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
};

export const deleteCourse = async (req, res) => {
    const id = req.params.id;

    try {
        const rowsDeleted = await CourseModel.destroy({ where: { id } });

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "Curso não encontrado" });
        }

        return res.status(200).json({ message: "Curso deletado com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
};

export const findCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await CourseModel.findOne({
            where: {
                id: id,
            },
        });

        if (course === null) {
            return res.status(404).json({
                message: "Curso não encontrado",
            });
        }

        return res.status(200).json(course);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
};
