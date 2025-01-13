import { Router } from 'express';
import { login } from '../controllers/loginControllers.js';

const router = new Router();

router.post('/login', login);

export default router;