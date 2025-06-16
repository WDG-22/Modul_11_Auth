import express from 'express';
import { mongoose } from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';
import dbInit from './db/index.js';
import ErrorResponse from './utils/ErrorResponse.js';
import errorHandler from './middlewares/errorHandler.js';

import { userRouter, booksRouter } from './routers/index.js';

await dbInit();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); // app.use(bodyParser)

app.get('/', async (req, res) => {
  const dbResponse = await mongoose.connection.db.admin().ping();
  if (dbResponse.ok !== 1) throw new ErrorResponse('DB is not connected', 503);
  res.json({ message: 'Running', dbResponse });
});

app.use('/users', userRouter);
app.use('/books', booksRouter);

app.use('/{*splat}', (req, res) => {
  throw new ErrorResponse(`Check route. You used ${req.originalUrl}`, 404);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.bgGreen(` Personal Library API listening on port ${port} `));
});
