import { Element } from '../models/elementModel.js';
import { createNewElement, deletingElement, getElement, activitiesPerDay } from '../services/elementServices.js';

export const getElements = async (req, res) => {
    try{
        const elements = await Element.findAll();
        res.json(elements);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getElementByID = async (req, res) => {
    try{
        const { ID } = req.params;
        const element = await getElement(ID);

        res.json(element);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getElementsDone = async (req, res) => {
    try{
        const { culminationDate } = req.params;
        const count = await activitiesPerDay(culminationDate);

        res.json({count});

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createElement = async (req, res) => {
    try{
        const { name, description, expectedDate, listID } = req.body;

        if(!name || !expectedDate){
            return res.status(400).json({message: "Por favor rellene todos los campos para crear el elemento."});
        }
        const newElement = await createNewElement({ name, description, expectedDate, listID });

        res.json(newElement);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateElement = async (req, res) => {
    try{
        const { ID } = req.params;
        const element = await getElement(ID);
        Object.assign(element, req.body);
        //element.set(req.body);
        await element.save();

        res.json(element);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteElement = async (req, res) => {
    try{
        const { ID } = req.params;
        await deletingElement(ID);
        res.sendStatus(204);
        
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}