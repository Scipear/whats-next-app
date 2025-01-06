import { User } from '../models/userModel.js';

// Controladores para procesar las peticiones y respuestas
export const createUser = async (req, res) => {
    try{
        const {username, mail, password, name, lastName, birthDate, picture} = req.body; // Se definen o no se los atributos que se agarraran del body

        const newUser = await User.create({
            username,
            mail,
            password,
            name,
            lastName,
            birthDate,
            picture,
        }) // Se crea un nuevo usuario usando el modelo y los atributos obtenidos

        res.json(newUser) // Respuesta al usuario, en este caso se devuelve la entidad creada
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}

export const getUsers = async (req, res) => {
    try{
        const users = await User.findAll() // Devuelve todos los registros de la tabla
        res.json(users)
    }catch(error){
        return res.status(500).json({ message: error.message }) 
    }
}

export const getUserbyID = async (req, res) => {
    try{
        const { ID } = req.params
        const user = await User.findByPk(ID)

        res.json(user) // Crear validaciones
    }catch(error){
        return res.status(500).json({ message: error.message }) 
    }
}

export const getUserbyUsername = async (req, res) => {
    try{
        const { username } = req.params
        const user = await User.findOne({
            where:{
                username,
            },
        })

        res.json(user) // Igualmente, crear validaciones
    }catch(error){
        return res.status(500).json({ message: error.message }) 
    }
}

export const updateUser = async (req, res) => {
    try{
        const { ID } = req.params
        const { username, mail, password, name, lastName, picture } = req.body
        const user = await User.findByPk(ID)

        user.username = username
        user.mail = mail
        user.password = password
        user.name = name 
        user.lastName = lastName 
        user.picture = picture

        await user.save()

        res.json(user) // Crear validaciones luego

    }catch(error){
        return res.status(500).json({ message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { ID } = req.params
        await User.destroy({
            where:{
                ID,
            },
        })
        res.sendStatus(204)
    }catch(error){
        return res.status(500).json({ message: error.message }) 
    }
}