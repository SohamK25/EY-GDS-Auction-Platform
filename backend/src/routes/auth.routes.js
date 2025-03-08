import express from 'express';
import { signup, signin, checkAuth, logout } from '../controller/auth.controller.js'
import authenticate from '../middleware/authentication.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post("/logout", logout);

router.get('/check', authenticate, checkAuth);

export default router;