import pg from 'pg';
import Sequelize from 'sequelize';

const database = process.env.NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;

export const sequelize = new Sequelize('wnDB', 'postgres', 'sfhdad', {
    host: 'localhost',
    dialect: 'postgres',

    //user: process.env.DB_USER,
    //host: process.env.DB_HOST,
    //database: process.env.DB_NAME,
    //password: process.env.DB_PASSWORD,
    //port: process.env.DB_PORT, (old connection)
})