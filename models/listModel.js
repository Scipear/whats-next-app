import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Element } from "./elementModel.js";

export const List = sequelize.define( 'List', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    description:{
        type: DataTypes.TEXT,
    },

    creationDate:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }

}, {
    tableName: 'Lists',
    timestamps: false,
})

// Relacion uno a muchos Lista-Elemento

List.hasMany(Element, {
    foreignKey: 'listID',
    sourceKey: 'ID',
})

Element.belongsTo(List, {
    foreignKey: 'listID',
    targetKey: 'ID',
})
