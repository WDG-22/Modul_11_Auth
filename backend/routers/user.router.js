import { Router } from 'express';
import {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  addBookToReadingList,
  updateBookStatus,
  deleteBookFromReadingList,
  getOneUser,
} from '../controllers/index.js';
import { User } from '../models/index.js';
import validate from '../middlewares/validate.js';
import { userSchema } from '../zod-schemas/user.schema.js';
import hasRole from '../middlewares/hasRole.js';
import authenticate from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.get('/', getAll(User));
userRouter.post('/', validate(userSchema), createOne(User));
userRouter.get('/:id', getOneUser);

userRouter.put('/:id', authenticate, hasRole('self'), validate(userSchema), updateOne(User));

userRouter.delete('/:id', deleteOne(User));

userRouter.post('/:id/books', authenticate, hasRole('self', 'admin'), addBookToReadingList);
userRouter.put('/:id/books/:bookId', authenticate, hasRole('self', 'admin'), updateBookStatus);
userRouter.delete('/:id/books/:bookId', authenticate, hasRole('self', 'admin'), deleteBookFromReadingList);

export default userRouter;
