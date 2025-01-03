import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Field } from "./fieldModel.js";
import { ElementField } from "./element_Field.js";

export const Element = sequelize.define( 'Element', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    additionDate:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    expectedDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },

    culminationDate:{
        type: DataTypes.DATE,
    },

    punctuality:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    outOfOrder:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    daysLate:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }

}, {
    tableName: 'Elements',
})

Element.belongsToMany(Field, { through: 'ElementField' });
Field.belongsToMany(Element, { through: 'ElementField' });