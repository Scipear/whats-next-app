import { Field } from "../models/fieldModel.js";

export const getFields = async (req, res) => {
    try{
        const fields = Field.findAll();
        res.json(fields);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getFieldByID = async (req, res) => {
    try{
        const { ID } = req.params;
        const field = await Field.findByPk(ID);

        res.json(field);

    }catch(error){
        
    }
}

export const createField = async (req, res) => {
    try{
        const { name } = req.body;
        const field = await Field.create({
            name,
        });

        res.json(field);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateField = async (req, res) => {
    try{
        const { ID } = req.params;
        const field = await Field.findByPk(ID);
        field.set(req.body);
        field.save();

        res.json(field);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteField = async (req, res) => {
    try{
       const { ID } = req.params;
       await Field.destroy({
        where:{
            ID,
        }
       });

       res.sendStatus(204);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
