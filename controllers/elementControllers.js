import { Element } from '../models/elementModel.js';

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
        const element = await Element.findByPk(ID);

        res.json(element);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createElement = async (req, res) => {
    try{
        const { expectedDate, listID } = req.body;
        const newElement = Element.create({
            expectedDate,
        });

        res.json(newElement);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateElement = async (req, res) => {
    try{
        const { ID } = req.params;
        const element = await Element.findByPk(ID);
        element.set(req.body);
        await element.save();

        res.json(element);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteElement = async (req, res) => {
    try{
        const { ID } = req.params;

        await Element.destoy({
            where:{
                ID,
            }
        });

        res.sendStatus(204);
        
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}