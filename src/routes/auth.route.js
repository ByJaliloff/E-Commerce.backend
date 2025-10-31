import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { login, register } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/register', register );
router.post('/login', login);
router.get('/me', protect, (req, res) => {
    res.json(req.user);
});
// router.post('/refresh', refreshToken);

export default router;