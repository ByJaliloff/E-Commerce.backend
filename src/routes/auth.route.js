import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { login, register } from '../controllers/auth.controller.js';
import { userSchemaCreate } from '../validation/user.validation.js';
import { validate } from '../middleware/validate.middleware.js';


const router = express.Router();

router.post('/register', validate(userSchemaCreate), register );
router.post('/login', login);
router.get('/me', protect, (req, res) => {
    res.json(req.user);
});
// router.post('/refresh', refreshToken);

export default router;