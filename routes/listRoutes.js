import { Router } from 'express';
import { createList, deleteList, getListbyID, getListbyTitle, getListElements, getLists, updateList } from '../controllers/listControllers.js';

const router = Router();

router.get('/lists', getLists);
router.get('/list/:ID', getListbyID);
router.get('/listFind/:title', getListbyTitle);
router.get('/list/:ID/elements', getListElements);
router.post('/list', createList);
router.put('/list/:ID', updateList);
router.delete('/list/:ID', deleteList);

export default router;