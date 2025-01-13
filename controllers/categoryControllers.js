import { Category } from '../models/categoryModel.js';
import { List } from '../models/listModel.js';

export const getCategories = async (req, res) => {
    try{
        const categories = await Category.findAll();
        res.json(categories);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getCategoryByID = async (req, res) => {
    try{
        const { ID } = req.params;
        const category = await Category.findByPk(ID);

        res.json(category);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getCategoryLists = async (req, res) => {
    try{
        const { ID } = req.params;
        const lists = await List.findAll({
            where:{
                categoryID: ID,
            }
        });

        res.json(lists);
        
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createCategory = async (req, res) => {
    try{
        const { name } = req.body;
        const category = await Category.create({
            name,
        });
        
        res.json(category);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { ID } = req.params;
        const category = await Category.findByPk(ID);
        category.set(req.body);
        await category.save();

        res.json(category);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteCategory = async (req, res) => {
    try{
       const { ID } = req.params;
       await Category.destroy({
        where:{
            ID,
        }
       });

       res.sendStatus(204);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}