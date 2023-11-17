import express from 'express';
import { redirectIfAlreadyLoggedIn } from '../middlewares/authMiddleware.js';
import { getLogin, getLogout, getRegister, postLogin, postRegister } from '../controllers/authController.js';

const router = express.Router();

// Routes for authentication are not meant to be used if an user is already logged in.
// A logged in user should have no reason and therefore not be allowed to log in again, or create an account.
// If they wish to do that, they will have to log out first.
router.use(redirectIfAlreadyLoggedIn);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/register', getRegister);
router.post('/register', postRegister);

router.get('/logout', getLogout);

export default router;