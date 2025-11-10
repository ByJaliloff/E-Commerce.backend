import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { checkVerifyCode, login, register, verifyEmail } from '../controllers/auth.controller.js';
import { userSchemaCreate } from '../validation/user.validation.js';
import { validate } from '../middleware/validate.middleware.js';


const router = express.Router();

router.post('/register', validate(userSchemaCreate), register );
router.post('/login', login);
router.get('/me', protect, (req, res) => {
    res.json(req.user);
});
router.post("/send-verify-code", protect, verifyEmail);
router.post('/verify-email', protect, checkVerifyCode);
// router.post('/refresh', refreshToken);

export default router;