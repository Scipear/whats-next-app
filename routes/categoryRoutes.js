import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryByID, getCategoryLists, updateCategory } from '../controllers/categoryControllers.js';

const router = new Router();

router.get('/categories', getCategories);
router.get('/category/:ID', getCategoryByID);
router.get('/category/:ID/lists', getCategoryLists);
router.post('/category', createCategory);
router.put('/category/:ID', updateCategory);
router.delete('/category/:ID', deleteCategory);

export default router;