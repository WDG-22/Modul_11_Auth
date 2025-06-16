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

const userRouter = Router();

userRouter.get('/', getAll(User));
userRouter.post('/', validate(userSchema), createOne(User));
userRouter.get('/:id', getOneUser);
userRouter.put('/:id', validate(userSchema), updateOne(User));
userRouter.delete('/:id', deleteOne(User));

userRouter.post('/:userId/books', addBookToReadingList);
userRouter.put('/:userId/books/:bookId', updateBookStatus);
userRouter.delete('/:userId/books/:bookId', deleteBookFromReadingList);

export default userRouter;
