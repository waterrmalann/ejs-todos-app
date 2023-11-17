import express from 'express';
import { preventIfNotLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes for todos are not meant to be used if a user is not logged in.
// Therefore, any request that attempts this route while not holding a session will be sent to the login page.
router.use(preventIfNotLoggedIn);

router.get('/', getTodos);
router.post('/', postTodos);

router.put('/:id', putTodos);
router.delete('/:id', deleteTodos);

export default router;