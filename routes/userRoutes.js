import { Router } from 'express';
import { createUser, getUsers, getUserbyID, getUserbyUsername, updateUser, deleteUser } from '../controllers/userControllers.js';

// Rutas http para acceder a las consultas

const router = Router();

router.get('/users', getUsers);
router.get('/user/:ID', getUserbyID);
router.get('/userFind/:username', getUserbyUsername); // Pensar en un nombre adecuado para la ruta, no puede ser el mismo que el del ID al parecer
router.post('/user', createUser);
router.put('/user/:ID', updateUser);
router.delete('/user/:ID', deleteUser);

export default router; // Ni idea de porque esta aqui pero me gustaria quitarlo