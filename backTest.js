import express from 'express';
import { sequelize } from './database/db.js';
import './models/categoryModel.js';
import './models/elementModel.js';
import './models/fieldModel.js';
import './models/listModel.js';
import './models/userModel.js';
import './models/category_Field.js';
import './models/element_Field.js';


const app = express();

    try{
        await sequelize.sync();
        console.log('Sync successfully.');
        app.listen(process.env.PORT);
        console.log('Listening on port ', process.env.PORT);
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
