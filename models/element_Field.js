import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Element } from "./elementModel.js";
import { Field } from "./fieldModel.js";

export const ElementField = sequelize.define( 'ElementField', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    ElementID:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Element',
            key: 'ID',
        }
    },

    FieldID:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Field',
            key: 'ID',
        }
    },

    value:{
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'ElementField',
})