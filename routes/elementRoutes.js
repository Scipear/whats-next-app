import { Router } from 'express';
import { getElements, getElementByID, createElement, updateElement, deleteElement, getElementsDone } from '../controllers/elementControllers.js';

const router = new Router();

router.get('/elements', getElements);
router.get('/element/:ID', getElementByID);
router.get('/elementsDone/:culminationDate', getElementsDone);
router.post('/element', createElement);
router.put('/element/:ID', updateElement);
router.delete('/element/:ID', deleteElement);

export default router;