import express from 'express';
import { sequelize } from './database/db.js';
import loginRoutes from './routes/loginRoutes.js';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';
import elementRoutes from './routes/elementRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import fieldRoutes from './routes/fieldRoutes.js';


const app = express();
app.use(express.json()); // necesario, es un middleware ni idea de que es
app.use(loginRoutes);
app.use(userRoutes); // necesario
app.use(listRoutes); // necesario
app.use(elementRoutes);
app.use(categoryRoutes);
app.use(fieldRoutes);

    try{
        await sequelize.sync({ force: false}); // Crea las tablas en la base de datos a partir de los modelos importados
        console.log('Sync successfully.');
        app.listen(process.env.PORT); // Creo que abre el puerto i dont really know
        console.log('Listening on port ', process.env.PORT);
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
