import express from 'express';
import { userLogin } from '../controllers/user.controller';
import {
  loginValidation,
  validate,
} from '../middlewares/validations/AuthValidationMiddleware';

const router = express.Router();

router.post('/login', loginValidation, validate, userLogin);

export default router;
