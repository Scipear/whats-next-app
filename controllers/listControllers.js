import { List } from '../models/listModel.js';
import { Element } from '../models/elementModel.js';
import { createNewList, getList, getElements, deletingList } from '../services/listServices.js';

/* Aqui ta complicao porque para tener los datos de los elementos de una lista esta contenida en 
    la tabla de elementField, entonces primero tiene que obtener el elemento y luego obtener los
    campos del elemento y luego juntarlos todos ay es horrible esta vaina
*/

export const createList = async (req, res) => {
    try{
        const { title, description, userID, categoryID } = req.body;

        if(!title || !categoryID){
            return res.status(400).json({message: "Por favor ingrese todos los campos obligatorios."});
        }

        const newList = await createNewList({title, description, userID, categoryID});

        res.json(newList);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getLists = async (req, res) => {
    try{
        const lists = await List.findAll();
        res.json(lists);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getListbyID = async (req, res) => {
    try{
        const { ID } = req.params;
        const list = await getList(ID);

        res.json(list);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getListbyTitle = async (req, res) => {
    try{
        const { title } = req.params;
        const list = await List.findOne({
            where:{
                title,
            }
        });

        res.json(list);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getListElements = async (req, res) => {
    try{
        const { ID } = req.params;
        const elements = await getElements(ID);

        res.json(elements);
        
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateList = async (req, res) => {
    try{
        const { ID } = req.params;
        const list = await getList(ID);
        list.set(req.body);
        await list.save();

        res.json(list);

    }catch(error){
        return res.status(500).json({message: error.message});
    }

}

export const deleteList = async (req, res) => {
    try{
        const { ID } = req.params;
        await deletingList(ID);
        res.sendStatus(204);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}