import { Router } from 'express';
import { getElements, getElementByID, createElement, updateElement, deleteElement } from '../controllers/elementControllers.js';

const router = new Router();

router.get('/elements', getElements);
router.get('/element/:ID', getElementByID);
router.post('/element', createElement);
router.put('/element/:ID', updateElement);
router.delete('/element/:ID', deleteElement);

export default router;