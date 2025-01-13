import { User } from '../models/userModel.js';
import { List } from '../models/listModel.js';
import { createNewUser, deletingUser, getLists, getUser } from '../services/userServices.js';

// Controladores para procesar las peticiones y respuestas
export const createUser = async (req, res) => {
    try{
        const { username, mail, password, name, lastName, birthDate, picture } = req.body; // Se definen o no se los atributos que se agarraran del body

        if(!username || !mail || !password || !name || !lastName || !birthDate){
            return res.status(400).json({ message: 'Todos los campos obligatorios deben ser llenados' });
        } // Podría mover esto dentro del service, idk

        const newUser = await createNewUser({username, mail, password, name, lastName, birthDate, picture}); // Se crea un nuevo usuario usando el modelo y los atributos obtenidos

        res.json(newUser); // Respuesta al usuario, en este caso se devuelve la entidad creada
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try{
        const users = await User.findAll(); // Devuelve todos los registros de la tabla
        res.json(users);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const getUserbyUsername = async (req, res) => {
    try{
        const { username } = req.params;
        const user = await getUser(username);

        res.json(user); // Igualmente, crear validaciones

    }catch(error){
        return res.status(500).json({ message: error.message }); 
    }
}

export const getUserLists = async (req, res) => {
    try{
        const { username } = req.params;
        const lists = await getLists(username);
        res.json(lists);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try{
        const { username } = req.params;
        const user = await getUser(username);
        user.set(req.body);
        await user.save();

        res.json(user); // Crear validaciones luego

    }catch(error){
        return res.status(500).json({ message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { username } = req.params;
        await deletingUser(username);
        res.sendStatus(204);
        
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}