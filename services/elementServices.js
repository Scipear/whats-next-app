import { Element } from "../models/elementModel.js";
import { Op } from "sequelize";

export const createNewElement = async (elementData) =>{
    try{
        const { name, description, expectedDate, listID } = elementData;

        const newElement = await Element.create({
            name,
            description,
            expectedDate,
            listID,
        });

        return newElement;
    }catch(error){
        throw error;
    }
}

export const getElement = async (elementID) => {
    try{
        const element = await existingElement(elementID);

        if(!element){
            throw new Error('Actividad no encontrada');
        }

        return element;

    }catch(error){
        throw error;
    }
}

export const deletingElement = async (elementID) => {
    try{
        if(!await existingElement(elementID)){
            throw new Error('Actividad no encontrada');
        }

        await Element.destroy({
            where:{
                ID: elementID,
            }
        });

    }catch(error){
        throw error;
    }
}

export const activitiesPerDay = async (date) => {
    try{
        const activities = await Element.count({
            where:{
                culminationDate: date,
            }

        })

        return activities;
    }catch(error){
        throw error;
    }
}

const existingElement = async (elementID) => {
    const existingElement = await Element.findByPk(elementID);
    
    if(!existingElement){
        return false;
    }
    
    return existingElement;
}