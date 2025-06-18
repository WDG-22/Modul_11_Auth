import { Router } from 'express';
import { getAll, createOne, getOne, updateOne, deleteOne, getAllBooks } from '../controllers/index.js';
import { Book } from '../models/index.js';
import validate from '../middlewares/validate.js';
import { bookSchema } from '../zod-schemas/book.schema.js';
import authenticate from '../middlewares/authenticate.js';
import hasRole from '../middlewares/hasRole.js';

const booksRouter = Router();

booksRouter.get('/', getAllBooks);
booksRouter.post('/', authenticate, hasRole('admin', 'librarian'), validate(bookSchema), createOne(Book));
booksRouter.get('/:id', getOne(Book));
booksRouter.put('/:id', authenticate, hasRole('admin', 'librarian'), validate(bookSchema), updateOne(Book));
booksRouter.delete('/:id', authenticate, hasRole('admin', 'librarian'), deleteOne(Book));

export default booksRouter;
