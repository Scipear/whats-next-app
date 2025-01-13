import { Router } from 'express';
import { createField, deleteField, getFieldByID, getFields, updateField } from '../controllers/fieldControllers.js';

const router = new Router();

router.get('/fields', getFields);
router.get('/field/:ID', getFieldByID);
router.post('/field', createField);
router.put('/field/:ID', updateField);
router.delete('/field/:ID', deleteField);

export default router;