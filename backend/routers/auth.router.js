import { Router } from 'express';
import { login, registerUser, logout } from '../controllers/auth.controllers.js';
import validate from '../middlewares/validate.js';
import { userSchema } from '../zod-schemas/index.js';
import { loginSchema } from '../zod-schemas/user.schema.js';

const authRouter = Router();

// /signup, /register,
authRouter.post('/register', validate(userSchema), registerUser);

//  /signin, /login
authRouter.post('/login', validate(loginSchema), login);

authRouter.post('/logout', logout);

export default authRouter;
