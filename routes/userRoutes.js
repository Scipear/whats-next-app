import { Router } from 'express';
import { createUser, getUsers, getUserbyUsername, updateUser, deleteUser, getUserLists } from '../controllers/userControllers.js';

// Rutas http para acceder a las consultas

const router = Router();

router.get('/users', getUsers);
router.get('/user/:username', getUserbyUsername); // Pensar en un nombre adecuado para la ruta, no puede ser el mismo que el del ID al parecer
router.get('/user/:username/lists', getUserLists); // Extrae todas las listas de un usuario
router.post('/user', createUser);
router.put('/user/:username', updateUser);
router.delete('/user/:username', deleteUser);

export default router; // Ni idea de porque esta aqui pero me gustaria quitarlo