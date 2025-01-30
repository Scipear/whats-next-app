import { Router } from "express";
import { createUser } from "../controllers/userControllers.js";

const router = new Router();

router.post('/register', createUser);

export default router;