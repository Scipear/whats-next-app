import { loginAuthentication } from "../services/loginServices.js";

export const login = async (req, res) => {
    try{
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({message: "Por favor ingrese usuario y contraseña"});
        }

        const user = await loginAuthentication({ username, password });

        res.json({
            message: 'Inicio de sesión exitoso',
            user,
        })
    }catch(error){
        res.status(500).json({message: error.message});
    }
}