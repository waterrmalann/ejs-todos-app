import express from 'express';
import { redirectIfAlreadyLoggedIn } from '../middlewares/authMiddleware.js';
import { getLogin, getLogout, getRegister, postLogin, postRegister } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', redirectIfAlreadyLoggedIn, getLogin);
router.post('/login', postLogin);

router.get('/register', redirectIfAlreadyLoggedIn, getRegister);
router.post('/register', postRegister);

router.get('/logout', getLogout);

export default router;