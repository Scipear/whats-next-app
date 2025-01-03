import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Field = sequelize.define( 'Field', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    type:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Fields',
})
