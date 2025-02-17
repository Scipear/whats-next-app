import { List } from "../models/listModel.js";
import { Element } from "../models/elementModel.js";

export const createNewList = async (listData) => {
    try{
        const { title, description, userID, categoryID } = listData;

        const newList = await List.create({
            title,
            description,
            userID,
            categoryID,
        });

        return newList;

    }catch(error){
        throw error;
    }
}

export const getList = async (listID) => {
    try{
        const list = await existingList(listID);

        if(!list){
            throw new Error('Lista no encontrada');
        }

        return list;

    }catch(error){
        throw error;
    }
}

export const getElements = async (listID) => {
    try{
        if(!await existingList(listID)){
            throw new Error('Lista no encontrada');
        }

        const elements = await Element.findAll({
            where:{
                listID,
            }
        });

        return elements;
    }catch(error){
        throw error;
    }
}

export const deletingList = async (listID) => {
    try{
        if(!await existingList(listID)){
            throw new Error('Lista no encontrada');
        }

        await List.destroy({
            where:{
                ID: listID,
            }
        });

    }catch(error){
        throw error;
    }
}

const existingList = async (listID) => {
    const existingList = await List.findByPk(listID);

    if(!existingList){
        return false;
    }

    return existingList;
}