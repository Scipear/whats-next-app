import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Category } from "./categoryModel.js";
import { Field } from "./fieldModel.js";

export const CategoryField = sequelize.define( 'CategoryField', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    CategoryID:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Category',
            key: 'ID',
        }
    },

    FieldID:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Field',
            key: 'ID',
        }
    }
})