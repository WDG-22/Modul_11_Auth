import { Router } from 'express';
import { getAll, createOne, getOne, updateOne, deleteOne } from '../controllers/index.js';
import { Book } from '../models/index.js';
import validate from '../middlewares/validate.js';
import { bookSchema } from '../zod-schemas/book.schema.js';

const booksRouter = Router();

booksRouter.get('/', getAll(Book));

booksRouter.post('/', validate(bookSchema), createOne(Book));

booksRouter.get('/:id', getOne(Book));
booksRouter.put('/:id', validate(bookSchema), updateOne(Book));
booksRouter.delete('/:id', deleteOne(Book));

export default booksRouter;
