import { Router } from 'express';
import validateZod from '../middlewares/validateZod.js';
import authenticate from '../middlewares/authenticate.js';
import { userSchema, signInSchema } from '../zod/schemas.js';
import { me, signup, signin, signout } from '../controllers/auth.controller.js';

const authRouter = Router();

// Registrierung
authRouter.route('/signup').post(validateZod(userSchema), signup);

// Login
authRouter.route('/signin').post(validateZod(signInSchema), signin);

authRouter.route('/me').get(authenticate, me);

authRouter.route('/signout').delete(signout);

export default authRouter;
