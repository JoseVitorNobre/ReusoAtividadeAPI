import { Sequelize } from "sequelize"
import { createCourseModel } from "../model/courseSchema.js"


const sequelize = new Sequelize('postgres', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
})

let CourseModel = null

const connection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexão feita com sucesso')
        CourseModel = await createCourseModel(sequelize)
        await sequelize.sync()
        console.log('Base de dados criada')
    } catch (error) {
        console.error('Não foi possivel conectar com a base de dados', error)
        
    }
}

export {
    connection,
    CourseModel
}