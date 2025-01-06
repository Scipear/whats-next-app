import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { List } from "./listModel.js";
import { Field } from "./fieldModel.js";
import { CategoryField } from "./category_Field.js";

export const Category = sequelize.define( 'Category', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Categories',
    timestamps: false,
})

Category.hasMany(List, {
    foreignKey: 'categoryID',
    sourceKey: 'ID',
})

List.belongsTo(Category, {
    foreignKey: 'categoryID',
    targetKey: 'ID',
})

// Relacion muchos a muchos Categoria-Campo. esta vaina fue un peo

Category.belongsToMany(Field, { through: 'CategoryField' });
Field.belongsToMany(Category, { through: 'CategoryField' });