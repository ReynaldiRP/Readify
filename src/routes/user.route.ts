import express from 'express';
import { userLogin, userRegister } from '../controllers/user.controller';
import {
  loginValidation,
  registerValidation,
  validate,
} from '../middlewares/validations/AuthValidationMiddleware';

const router = express.Router();

router.post('/login', loginValidation, validate, userLogin);
router.post('/register', registerValidation, validate, userRegister);

export default router;
