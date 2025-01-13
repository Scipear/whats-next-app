import { User } from '../models/userModel.js';

export const loginAuthentication = async ({ username, password }) => {
    try{
        const user = await User.findOne({
            where:{
                username: username,
            }
        });

        if(!user){
            throw new Error('Usuario no encontrado');
        }

        if(user.password !== password){
            throw new Error('Contraseña incorrecta');
        }

        return user;

    }catch(error){
        throw error;
    }
}