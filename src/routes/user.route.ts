import express from 'express';
import {
  userLogin,
  userLogout,
  userRegister,
} from '../controllers/user.controller';
import {
  loginValidation,
  registerValidation,
  validate,
} from '../middlewares/validations/AuthValidationMiddleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/login', loginValidation, validate, userLogin);
router.post('/register', registerValidation, validate, userRegister);
router.delete('/logout', authMiddleware, userLogout);
router.get('/test-auth', authMiddleware, (req, res) => {
  res.json({
    message: 'You are authenticated',
    user: req.user,
  });
});

export default router;
