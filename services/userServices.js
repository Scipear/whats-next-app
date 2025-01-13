import { Op } from 'sequelize';
import { User } from '../models/userModel.js';
import { List } from '../models/listModel.js';

export const createNewUser = async (userData) => {
    try{
        const { username, mail, password, name, lastName, birthDate, picture } = userData;

        if(await existingUsername(username)){
            throw new Error('Este usuario ya está en uso');
        }

        if(await existingMail(mail)){
            throw new Error('Este email ya está en uso');
        }

        const newUser = await User.create({
            username,
            mail,
            password,
            name,
            lastName,
            birthDate,
            picture,
        });

        return newUser;

    }catch(error){
        throw error;
    }
}

export const getUser = async (username) => {
    try{
        const user = await existingUsername(username);

        if(!user){
            throw new Error('Usuario no encontrado');
        }

        return user;

    }catch(error){
        throw error;

    }
}

export const getLists = async (username) => {
    try{
        
        if(!await existingUsername(username)){
            throw new Error('Usuario no encontrado');
        }

        const lists = await List.findAll({
            where:{
                userID: username,
            }
        });
        
        return lists;

    }catch(error){
        throw error;
    }
}

export const deletingUser = async (username) => {
    try{
        if(!await existingUsername(username)){
            throw new Error('Usuario no encontrado');
        }

        await User.destroy({
            where:{
                username: username,
            }
        });

    }catch(error){
        throw error;
    }
}

const existingUsername = async (username) => {
    const existingUsername = await User.findOne({
        where:{
            username: username,
        }
    });

    if(!existingUsername){
        return false;
    }

    return existingUsername;
}

const existingMail = async (mail) => {
    const existingMail = await User.findOne({
        where:{
            mail: mail,
        }
    });

    if(!existingMail){
        return false;
    }

    return existingMail;
}