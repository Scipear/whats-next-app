import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { List } from "./listModel.js";

export const User = sequelize.define( 'User', {
    username:{
        type: DataTypes.STRING,
        primaryKey: true,
    },

    mail:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    birthDate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    picture:{
        type: DataTypes.STRING,
        defaultValue: 'default.png',
    },

    creationDate:{
        type: DataTypes.DATE, // Cambiar a DATEONLY
        defaultValue: DataTypes.NOW,
    }

}, {
    tableName: 'Users',
    timestamps: false,
})


// Relacion de uno a muchos Usuario-Lista

User.hasMany(List, {
    foreignKey: 'userID',
    sourceKey: 'username',

})

List.belongsTo(User, {
    foreignKey: 'userID',
    targetKey: 'username',
})