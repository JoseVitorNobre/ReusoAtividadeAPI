import { DataTypes } from "sequelize";

export const createCourseModel = (sequelize) => {
    const Course = sequelize.define('Course', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        workload: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Course;
};
